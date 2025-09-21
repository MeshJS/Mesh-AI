from app.utils.safe_db_operation import safe_db_operation
import asyncio

async def reorder_chunks(
        supabase,
        relative_path
):
    response = await supabase.table("docs") \
        .select("id", "chunk_id", "chunk_title") \
        .eq("filepath", relative_path) \
        .order("chunk_id") \
        .execute()

    if response and response.data:
        reorder_chunks = []
        for new_idx, chunk in enumerate(response.data):
            if chunk["chunk_id"] != new_idx:
                updated_title = chunk["chunk_title"].split("_")[0] + f"_{new_idx}" if "_" in chunk["chunk_title"] else chunk["chunk_title"]
                reorder_chunks.append(
                    safe_db_operation(
                    supabase.table("docs") \
                    .update({"chunk_id": new_idx, "chunk_title": updated_title}) \
                    .eq("id", chunk["id"]) \
                    .execute()
                    )
                )
        
        await asyncio.gather(*reorder_chunks)