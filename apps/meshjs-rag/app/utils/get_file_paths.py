import pathlib
from typing import List, Union

def get_file_paths(dir_path: Union[str, pathlib.Path], base_path: Union[str, pathlib.Path] = None) -> List[str]:
  dir_path = pathlib.Path(dir_path)

  if base_path is None:
    base_path = dir_path
  else:
    base_path = pathlib.Path(base_path)

  if not dir_path.is_dir():
    raise FileNotFoundError(f"The directory '{dir_path}' doesn't exist")

  file_paths = []

  try:
    for item in dir_path.iterdir():
      if item.is_file() and item.suffix == ".mdx":
        file_paths.append(str(item.relative_to(base_path)))
      elif item.is_dir():
        file_paths.extend(get_file_paths(str(item), base_path))
  except Exception as e:
    raise IOError(f"An error occured while accessing the directory '{dir_path}': {e}")

  return file_paths