from dotenv import load_dotenv
load_dotenv()
import os
import httpx
import asyncio
import pathlib

class GithubService:
  def __init__(self):
    self.base_url="https://api.github.com"
    self.owner="smutyala1at"
    self.repo="meshjs-docs"
    self.doc_path="content/docs"
    self.output_path="docs"
    self.token=os.getenv("GITHUB_TOKEN") or None

  def _get_headers(self):
    headers = {
      "Accept": "application/vnd.github.v3+.json",
      "User-Agent": "MeshJS-RAG"
    }

    if self.token:
      headers["Authorization"] = f"token {self.token}"
    return headers

  async def _fetch_github_dir(self,client: httpx.AsyncClient, remote_path: str):
    url = f"{self.base_url}/repos/{self.owner}/{self.repo}/contents/{remote_path}"
    try:
      response = await client.get(url)
      response.raise_for_status()
      return response.json()
    except httpx.HTTPStatusException as e:
      print(f"Error fetching the directory '{remote_path}': HTTP status {e.response.status_code}")
      return None
    except httpx.RequestError as e:
      print(f"Network error while fetching the directory '{remote_path}': {e}")
      return None

  async def _download_github_file(self, client: httpx.AsyncClient, download_url: str) -> str:
    try:
      response = await client.get(download_url)
      response.raise_for_status()
      return response.text
    except httpx.HTTPStatusError as e:
      print(f"Error downloading file '{download_url}': HTTP status {e.response.status_code}")
      return None
    except httpx.RequestError as e:
      print(f"Network error while downloading file '{download_url}': {e}")
      return None

  async def _download_and_save(self, client: httpx.AsyncClient, download_url: str, local_path: pathlib.Path):
    content = await self._download_github_file(client, download_url)
    if content:
      try:
        local_path.write_text(content, encoding="utf-8")
        print(f"Downloaded: {download_url} to {local_path}")
      except OSError as e:
        print(f"Failed to write the file to {local_path}: {e}")

  async def _process_path(self, client: httpx.AsyncClient, current_github_path: str, local_dir: str):
    items = await self._fetch_github_dir(client, current_github_path)
    if items is None:
      return

    file_tasks = []
    for item in items:
      local_path = pathlib.Path(local_dir) / item["name"]
      if item["type"] == "file" and item.get("download_url"):
        file_tasks.append(self._download_and_save(client, item["download_url"], local_path))
      elif item["type"] == "dir":
        sub_dir = pathlib.Path(local_dir) / item["name"]
        sub_dir.mkdir(parents=True, exist_ok=True)
        await self._process_path(client, item["path"], str(sub_dir))

    if file_tasks:
      await asyncio.gather(*file_tasks)

  async def download_docs(self):
    pathlib.Path(self.output_path).mkdir(parents=True, exist_ok=True)
    async with httpx.AsyncClient(headers=self._get_headers()) as client:
      await self._process_path(client, self.doc_path, self.output_path)


if __name__ == "__main__":
  github = GithubService()
  asyncio.run(github.download_docs())
  print("Successfully downloaded docs from github")