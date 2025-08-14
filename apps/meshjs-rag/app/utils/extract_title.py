def extract_chunk_title(chunk: str) -> str:
  chunk = chunk.replace("/n", "\n") # what a culprit, ugh
  for line in chunk.splitlines():
    if line.startswith("## "):
      return line.strip()[3:]
    elif line.startswith("title: "):
      return line.strip()[7:]
    else:
      return ""