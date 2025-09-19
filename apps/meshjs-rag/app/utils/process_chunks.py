from app.utils.checksum import calculate_checksum
from app.utils.safe_db_operation import safe_db_operation
from app.services.openai import OpenAIService 
from app.utils.reorder_chunks import reorder_chunks
from supabase import AsyncClient
from typing import List
from tenacity import RetryError
import openai
import asyncio
import os

openai_api_key = os.getenv("OPENAI_KEY") or None
if openai_api_key is None:
  raise ValueError("OpenAI api key is missing")

openai_service = OpenAIService(openai_api_key=openai_api_key)

async def process_chunks_and_update_db(
    chunks: List[str],
    file_content: str,
    relative_path: str,
    supabase: AsyncClient,
    cache_key,
    title_extractor
):
  current_chunk_data = {}

  # current chunks
  for idx, chunk in enumerate(chunks):
    chunk_title = title_extractor(chunk, idx, chunks)

    if not chunk_title:
      filepath = relative_path.split("/")
      chunk_title = f"{filepath[-2]}/{filepath[-1]}_1" if len(filepath) > 1 else f"{relative_path}_1"

    current_chunk_data[chunk_title] = {
      "chunk": chunk,
      "chunk_id": idx,
      "checksum": calculate_checksum(chunk)
    }

  # existing chunks
  try:
    response = await supabase.table("docs") \
                            .select("id", "chunk_title", "chunk_id", "checksum") \
                            .eq("filepath", relative_path) \
                            .execute()
    
    existing_records = {
      record["chunk_title"]: record
      for record in response.data
    }
  except Exception as e:
    print(f"Failed to fetch existing records for {relative_path}: {e}")
    return

  # compare
  chunks_to_embed = []
  db_operations = []
  needs_reorder = False

  all_keys = set(current_chunk_data.keys()) | set(existing_records.keys())

  for key in all_keys:
    chunk_title = key
    current = current_chunk_data.get(key)
    existing = existing_records.get(key)

    if current and existing:
      if current["checksum"] != existing["checksum"]:
        print(f"Updating chunk: {chunk_title}")
        try:
          response = await openai_service.situate_context(file_content, current["chunk"], cache_key=cache_key)
          await asyncio.sleep(1)
          contextual_chunk = "---\n".join([response, current["chunk"]])
          chunks_to_embed.append(contextual_chunk)

          db_operations.append({
              "filepath": relative_path,
              "chunk_id": current["chunk_id"],
              "chunk_title": chunk_title,
              "checksum": current["checksum"],
              "content": current["chunk"],
              "record_id": existing["id"],
              "is_update": True
          })
        except (openai.APIError, openai.AuthenticationError, openai.RateLimitError, RetryError) as e:
          print(f"Skipping chunk {chunk_title} due to OpenAI 'situation_context' API error: {e}")
          continue

      elif current["chunk_id"] != existing.get("chunk_id"):
        print(f"Updating chunk order for {chunk_title}")
        updated_title = chunk_title.split("_")[0] + f"_{current['chunk_id']}" if "_" in chunk_title else chunk_title
        await safe_db_operation(
          supabase.table("docs").update({"chunk_id": current["chunk_id"], "chunk_title": updated_title}).eq("id", existing["id"]).execute()
        )
        # reorder after update
        needs_reorder = True

      else:
        print(f"Skipping the unchanged chunk: {chunk_title}")

    elif current and not existing:
      print(f"New chunk {chunk_title}")
      try:
        response = await openai_service.situate_context(file_content, current["chunk"], cache_key=cache_key)
        await asyncio.sleep(1)
        contextual_chunk = "---\n".join([response, current["chunk"]])
        chunks_to_embed.append(contextual_chunk)
        db_operations.append({
            "filepath": relative_path,
            "chunk_id": current["chunk_id"],
            "chunk_title": chunk_title,
            "checksum": current["checksum"],
            "content": current["chunk"],
            "is_update": False
        })
        # reorder after new chunk
        needs_reorder = True
      except (openai.APIError, openai.AuthenticationError, openai.RateLimitError, RetryError) as e:
          print(f"Skipping chunk {chunk_title} due to OpenAI 'situation_context' API error: {e}")
          continue

    elif not current and existing:
      print(f"Deleting chunk: {chunk_title}")
      await safe_db_operation(
        supabase.table("docs").delete().eq("id", existing["id"]).execute()
      )

      # reorder after deletion
      needs_reorder = True


  if chunks_to_embed:
    try:
      embeddings = await openai_service.get_batch_embeddings(chunks_to_embed)
    except (openai.APIError, openai.AuthenticationError, openai.RateLimitError, RetryError) as e:
      print(f"Skipping all DB operations for this file due to failed embedding batch: {e}")
      return

    db_tasks = []
    for i, embedding in enumerate(embeddings):
      if not embedding:
        title = db_operations[i]["chunk_title"]
        print(f"Skipping DB operation for chunk '{title}' due to failed embedding")
        continue

      operation_data = db_operations[i]

      if operation_data["is_update"]:
        db_tasks.append(
          safe_db_operation(
            supabase.table("docs").update({
              "content": operation_data["content"],
              "contextual_text": chunks_to_embed[i],
              "embedding": embedding,
              "filepath": operation_data["filepath"],
              "chunk_id": operation_data["chunk_id"],
              "chunk_title": operation_data["chunk_title"],
              "checksum": operation_data["checksum"]
            }).eq("id", operation_data["record_id"]).execute()
          )
        )
      else:
        db_tasks.append(
          safe_db_operation(
            supabase.table("docs").insert({
              "content": operation_data["content"],
              "contextual_text": chunks_to_embed[i],
              "embedding": embedding,
              "filepath": operation_data["filepath"],
              "chunk_id": operation_data["chunk_id"],
              "chunk_title": operation_data["chunk_title"],
              "checksum": operation_data["checksum"]
            }).execute()
          )
        )

    await asyncio.gather(*db_tasks)
    
  if needs_reorder:
    await reorder_chunks(supabase, relative_path)

