import asyncio

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

router = APIRouter(prefix='/stream', tags=['Stream'])


async def event_generator():
  """
  Simulates checking the database for new entries.
  In production, this could listen to a Postgres channel or message queue.
  """
  while True:
    await asyncio.sleep(5)

    yield 'data: {"message": "New entry added!", "timestamp": "xyz"}\n\n'


@router.get('/entries')
async def stream_new_entries():
  return StreamingResponse(event_generator(), media_type='text/event-stream')
