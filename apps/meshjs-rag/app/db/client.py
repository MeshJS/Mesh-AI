from dotenv import load_dotenv
load_dotenv()
import os
from supabase import acreate_client, AsyncClient as Client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
  raise ValueError("SUPABASE_URL and SUPABASE_KEY are required")

async def get_db_client() -> Client:
  return await acreate_client(SUPABASE_URL, SUPABASE_KEY)

