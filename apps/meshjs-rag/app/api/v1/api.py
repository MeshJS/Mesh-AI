from fastapi import APIRouter
from .ingest import router as ingest_router
from .ask_mesh_ai import router as ask_mesh_ai_router


api_router = APIRouter()
api_router.include_router(ingest_router, prefix="/ingest", tags=["ingest"])
api_router.include_router(ask_mesh_ai_router, prefix="/ask-mesh-ai", tags=["ask-mesh-ai"])