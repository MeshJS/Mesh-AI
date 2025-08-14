from typing import Literal, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
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
openai_service = OpenAIService()
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