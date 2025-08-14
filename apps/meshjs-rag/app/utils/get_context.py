from typing import List
from supabase import AsyncClient



async def get_context(embedded_query: List[float], supabase: AsyncClient) -> str:
  response = await supabase.rpc("match_docs", {
    "query_embedding": embedded_query,
    "match_threshold": 0.2,
    "match_count": 5
  }).execute()

  contextual_text = "\n\n".join([data["contextual_text"] for data in response.data]) if response.data else None

  if contextual_text:
    return contextual_text
  else:
    return None