from typing import Literal, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from supabase import AsyncClient
import openai
import os

from app.services.openai import OpenAIService
from app.utils.get_context import get_context
from app.db.client import get_db_client


router = APIRouter()
security = HTTPBearer()

###########################################################################################################
# MODELS
###########################################################################################################
class ChatMessage(BaseModel):
  role: Literal["system", "user", "assistant"]
  content: str

class ChatCompletionRequest(BaseModel):
  model: str
  messages: List[ChatMessage]
  stream: Optional[bool] = False

class MCPRequestBody(BaseModel):
  query: str
  model: str

###########################################################################################################
# ENDPOINTS
###########################################################################################################
@router.post("/chat/completions")
async def ask_mesh_ai(body: ChatCompletionRequest, credentials: HTTPAuthorizationCredentials = Depends(security), supabase: AsyncClient = Depends(get_db_client)):

  token = credentials.credentials
  if not token or token != os.getenv("ADMIN_KEY"):
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="You are not authorized"
    )

  openai_api_key = os.getenv("OPENAI_KEY") or None
  if openai_api_key is None:
    raise ValueError("OpenAI api key is missing")

  openai_service = OpenAIService(
    embedding_api_key=openai_api_key,
    completion_api_key=openai_api_key,
    completion_model="gpt-4o-mini"
  )

  try:
    question = body.messages[-1].content
    embedded_query = await openai_service.embed_query(question)
    context = await get_context(embedded_query, supabase)
    generator = openai_service.get_answer(question=question, context=context)
    return StreamingResponse(generator, media_type="text/event-stream")

  except (openai.APIError, openai.AuthenticationError, openai.RateLimitError) as e:
    raise HTTPException(
      status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
      detail=f"An OpenAI API error occurred: {e}"
    )
  except Exception as e:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail=f"An unexpected error occurred: {e}"
    )


###########################################################################################################
@router.post("/mcp")
async def mesh_mcp(body: MCPRequestBody, authorization: str = Header(None), supabase: AsyncClient = Depends(get_db_client)):

  if not authorization or not authorization.startswith("Bearer"):
    print("error")
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="You are not authorized"
    )
  
  embedding_api_key = os.getenv("OPENAI_KEY") or None
  if embedding_api_key is None:
    raise ValueError("Embedding api key is missing")

  try:
    completion_api_key = authorization.split(" ")[-1]
    question = body.query
    model = body.model

    if model.startswith("gemini"):
      base_url = "https://generativelanguage.googleapis.com/v1beta/openai/"
    elif model.startswith("claude"):
      base_url = "https://api.anthropic.com/v1/"

    openai_service = OpenAIService(
      embedding_api_key=embedding_api_key,
      completion_api_key=completion_api_key,
      completion_model=model,
      base_url=base_url
    )

    embedded_query = await openai_service.embed_query(question)
    context = await get_context(embedded_query, supabase)
    response = await openai_service.get_mcp_answer(question=question, context=context)
    return response

  except (openai.APIError, openai.AuthenticationError, openai.RateLimitError) as e:
    raise HTTPException(
      status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
      detail=f"An OpenAI API error occurred: {e}"
    )
  except Exception as e:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail=f"An unexpected error occurred: {e}"
    )