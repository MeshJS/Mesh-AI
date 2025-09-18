async def safe_db_operation(task):
  try:
    await task
  except Exception as e:
    print(f"Database operation failed: {e}")
    return None
  return True