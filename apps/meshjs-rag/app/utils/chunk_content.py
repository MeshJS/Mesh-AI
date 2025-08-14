def chunk_content_by_h2(content: str):
    chunks = []
    current_chunk = []
    for line in content.splitlines():
      if line.startswith("## ") and line.strip()[-6:] != "[!toc]":
        if current_chunk:
          chunks.append("\n".join(current_chunk).strip())
        current_chunk = [line]
      else:
        current_chunk.append(line)

    if current_chunk:
      chunks.append("/n".join(current_chunk).strip())

    return chunks