from dotenv import load_dotenv
load_dotenv()
import os
import asyncpg
import asyncio

db_host = os.getenv("DB_HOST")
db_port = int(os.getenv("DB_PORT", 5432))
db_user = os.getenv("DB_USER")
db_name = os.getenv("DB_NAME")
db_password = os.getenv("DB_PASSWORD")

if not all([db_host, db_user, db_name, db_password]):
  raise ValueError("Missing required DB environment variables")

########## SCHEMAS ###########
sql_schema = """
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS docs(
  id bigserial primary key,
  content text,
  contextual_text text,
  embedding vector(1536),
  filepath text NOT NULL,
  chunk_id INTEGER NOT NULL,
  chunk_title text NOT NULL,
  checksum text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_docs_filepath ON docs (filepath);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_trigger ON docs;
CREATE TRIGGER set_updated_at_trigger
BEFORE UPDATE ON docs
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
"""


match_docs_schema = """
CREATE OR REPLACE FUNCTION match_docs(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE(
  id bigint,
  contextual_text text,
  similarity float,
  filepath text,
  chunk_id INTEGER,
  chunk_title text,
  checksum text
)
LANGUAGE sql STABLE
AS $$
  SELECT
    docs.id,
    docs.contextual_text,
    1 - (docs.embedding <=> query_embedding) AS similarity,
    docs.filepath,
    docs.chunk_id,
    docs.chunk_title,
    docs.checksum
  FROM docs
  WHERE 1 - (docs.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
"""

async def setup_db():
  conn = None

  try:
    conn = await asyncpg.connect(
      host=db_host,
      port=db_port,
      user=db_user,
      password=db_password,
      database=db_name,
      ssl="require"
    )

    await conn.execute(sql_schema)
    await conn.execute(match_docs_schema)

    print("Database schema setup completed")
  except Exception as e:
    print("Error setting up the database: ", e)
    raise
  finally:
    if conn:
      await conn.close()
      print("Disconnected from the database")

if __name__ == "__main__":
  asyncio.run(setup_db())