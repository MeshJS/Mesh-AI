from fastapi import FastAPI
from app.api.v1.api import api_router
import uvicorn

app = FastAPI()
app.include_router(api_router, prefix="/api/v1", tags=["api"])

@app.get("/")
async def root():
  return {
    "message": "Welcome home!"
  }

@app.get("/health")
async def get_health_status():
  return {
    "status": "OK"
  }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )