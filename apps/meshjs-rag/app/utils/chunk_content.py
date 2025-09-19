from typing import List
import re

def flush_chunk(current_chunk: List[str], chunks: List[str]):
  if current_chunk:
    chunks.append("\n".join(current_chunk).strip())

def chunk_content_by_h2(content: str) -> List[str]:
    chunks = []
    current_chunk = []
    for line in content.splitlines():
      if line and line.startswith("## ") and not line.strip().endswith("[!toc]"):
        flush_chunk(current_chunk, chunks)
        current_chunk = [line]
      else:
        current_chunk.append(line)

    flush_chunk(current_chunk, chunks)

    return chunks


def chunk_class_file(content: str) -> List[str]:
  chunks = []
  current_chunk = []
  lines = content.splitlines()

  for i, line in enumerate(lines):
    if (
        line.startswith("## Constructors") \
        or (line.startswith("## Properties") and lines[i+2].startswith("###")) \
        or (line.startswith("## Methods") and lines[i+2].startswith("###"))
      ):
        flush_chunk(current_chunk, chunks)
        current_chunk = [line]
    else:
      current_chunk.append(line)
  
  flush_chunk(current_chunk, chunks)
    
  if chunks and chunks[-1].startswith("## Methods"):
    chunk = chunks.pop()
    method_chunks = [method.strip() for method in chunk.split("***") if method.strip()]
    chunks.extend(method_chunks)

  return chunks
