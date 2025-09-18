from supabase.client import AsyncClient
from app.utils.checksum import calculate_checksum
from app.utils.chunk_content import chunk_class_file
from app.utils.extract_title import extract_class_chunk_title, extract_chunk_title
from app.utils.process_chunks import process_chunks_and_update_db
import pathlib


async def process_package_docs_and_update_db(
        file_content: str,
        relative_path: str,
        supabase: AsyncClient
):
    class_type = any(part == "classes" for part in pathlib.Path(relative_path).parts)
    cache_key = calculate_checksum(file_content)

    if class_type:
        chunks = chunk_class_file(file_content)
        title_extractor = lambda chunk, idx, chunks: f"{extract_class_chunk_title(chunk, chunks)}"
    else:
        chunks = [file_content]
        title_extractor = lambda chunk, idx, chunks: f"{extract_chunk_title(chunk)}_{idx}"

    await process_chunks_and_update_db(
        chunks,
        file_content,
        relative_path,
        supabase, 
        cache_key,
        title_extractor
    )