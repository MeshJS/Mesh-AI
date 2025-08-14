import hashlib

def calculate_checksum(chunk: str) -> str:
  sha256 = hashlib.sha256()
  sha256.update(chunk.encode("utf-8"))
  return sha256.hexdigest()