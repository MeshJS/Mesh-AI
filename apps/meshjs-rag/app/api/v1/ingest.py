import os
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import pathlib
from supabase import AsyncClient

from app.services.github import GithubService
from app.utils.get_file_paths import get_docs_file_paths, get_packages_file_paths
from app.utils.get_file_content import get_file_content
from app.db.client import get_db_client
from app.utils.process_docs_file_and_update_db import process_docs_file_and_update_db
from app.utils.process_package_docs_and_update_db import process_package_docs_and_update_db

router = APIRouter()
security = HTTPBearer()

###########################################################################################################
# ENDPOINTS
###########################################################################################################

@router.post("/")
async def ingest_docs(credentials: HTTPAuthorizationCredentials = Depends(security), supabase: AsyncClient = Depends(get_db_client)):

  token = credentials.credentials
  if not token or token != os.getenv("ADMIN_KEY"):
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="You are not authorized"
    )
  
  github = GithubService(owner="MeshJS", repo="mimir", doc_path="apps/docs/content/docs", output_path="docs")
  await github.download_docs()

  docs_dir = pathlib.Path(__file__).resolve().parents[3] / "docs"

  try:
    file_paths = get_docs_file_paths(docs_dir)
  except FileNotFoundError as e:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"The documents directory was not found: {e}"
    )
  except IOError as e:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail=f"An I/O error occurred while accessing the documents directory: {e}"
    )

  for relative_path in file_paths:
    abs_path = docs_dir / relative_path
    try:
      file_content = get_file_content(abs_path)
      await process_docs_file_and_update_db(file_content, relative_path, supabase)
    except (FileNotFoundError, IOError) as e:
      print(f"Skipping file due to error: {e}")
      continue

    except Exception as e:
      raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=f"An error occured during the file ingestion: {e}"
      )

  return {
    "message": "Ingestion process successfully completed"
  }


@router.post("/packages")
async def ingest_packages(credentials: HTTPAuthorizationCredentials = Depends(security), supabase: AsyncClient = Depends(get_db_client)):

  token = credentials.credentials
  if not token or token != os.getenv("ADMIN_KEY"):
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="You're not authorized"
    )
  
  packages_docs_md_path = pathlib.Path(__file__).resolve().parents[6] / "mesh/docs/markdown"

  try:
    files_path = get_packages_file_paths(packages_docs_md_path)
  except FileExistsError as e:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"The packages docs folder was not found: {e}"
    )
  except IOError as e:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      details=f"An I/O error occured while accessing the packages docs directory: {e}"
    )
  
  for abs_path in files_path:
    relative_path = str(pathlib.Path(abs_path).relative_to(packages_docs_md_path))
    try:
      file_content = get_file_content(abs_path)
      await process_package_docs_and_update_db(file_content, str(relative_path), supabase)
    except (FileNotFoundError, IOError) as e:
      print(f"Skipping the file '{relative_path}' due to an error: {e}")
    except Exception as e:
      raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=f"An error occured during the file ingestion: {e}"
      )
    
  return {
    "message": "Ingestion process successful for package docs"
  }


@router.post("/aiken-docs")
async def ingest_packages(credentials: HTTPAuthorizationCredentials = Depends(security), supabase: AsyncClient = Depends(get_db_client)):

  token = credentials.credentials
  if not token or token != os.getenv("ADMIN_KEY"):
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="You're not authorized"
    )
  
  github = GithubService(owner="aiken-lang", repo="site", doc_path="src/pages", output_path="aiken-docs")
  await github.download_docs()
  
  aiken_docs_md_path = pathlib.Path(__file__).resolve().parents[3] / "aiken-docs"

  try:
    file_paths = get_docs_file_paths(aiken_docs_md_path)
  except FileNotFoundError as e:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"The documents directory was not found: {e}"
    )
  except IOError as e:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail=f"An I/O error occurred while accessing the documents directory: {e}"
    )

  for relative_path in file_paths:
    abs_path = aiken_docs_md_path / relative_path
    try:
      file_content = get_file_content(abs_path)
      await process_docs_file_and_update_db(file_content, relative_path, supabase)
    except (FileNotFoundError, IOError) as e:
      print(f"Skipping file due to error: {e}")
      continue

    except Exception as e:
      raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=f"An error occured during the file ingestion: {e}"
      )

  return {
    "message": "Ingestion process successfully completed"
  }