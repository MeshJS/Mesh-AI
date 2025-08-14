import pathlib
from typing import Union

def get_file_content(abs_path: Union[str, pathlib.Path]) -> str:
  try:
    with open(abs_path, "r", encoding="utf-8") as file:
      return file.read()
  except FileNotFoundError:
    raise FileNotFoundError(f"The file at '{abs_path}' could not be found")
  except Exception as e:
    raise IOError(f"An error occured while reading the file '{abs_path}': {e}")