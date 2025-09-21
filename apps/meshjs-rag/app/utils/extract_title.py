from typing import List

def extract_chunk_title(chunk: str) -> str:
  chunk = chunk.replace("/n", "\n") # what a culprit, ugh
  for line in chunk.splitlines():
    if line.startswith("## "):
      return line.strip()[3:]
    if line.startswith("title: "):
      return line.strip()[7:]
    ##
    finds = ["# Class: ", "# Function: ", "# Type Alias: ", "# Variable: ", "# Interface: "]
    if line.startswith(tuple(finds)):
      return line.strip()
  
  return ""

def extract_class_chunk_title(chunk: str, chunks: List[str]) -> str:
  chunk = chunk.replace("/n", "\n")
  class_title = extract_chunk_title(chunks[0]) or "UnknownClass"

  for line in chunk.splitlines():
    if line.startswith("# Class: "):
      return line.strip()
    if line.startswith("## Constructors"):
      return f"{class_title}'s constructor"
    if line.startswith("## Properties"):
      return f"{class_title}'s properties"
    if line.startswith("## Methods"):
      continue
    if line.startswith("### "):
      return f"{class_title}'s method: {line.removeprefix('### ').strip()}"
    
  return ""
    