from supabase.client import AsyncClient
from app.utils.chunk_content import chunk_content_by_h2
from app.utils.checksum import calculate_checksum
from app.utils.process_chunks import process_chunks_and_update_db
from app.utils.extract_title import extract_chunk_title

async def process_docs_file_and_update_db(
        file_content: str,
        relative_path: str,
        supabase: AsyncClient
):
    chunks = chunk_content_by_h2(file_content)
    cache_key = calculate_checksum(file_content)
    await process_chunks_and_update_db(
        chunks,
        file_content,
        relative_path,
        supabase,
        cache_key,
        title_extractor=lambda chunk, idx, chunks: extract_chunk_title(chunk)
    )