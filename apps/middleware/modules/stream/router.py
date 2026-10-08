import asyncio

from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse

from .broadcaster import broadcaster

router = APIRouter(prefix='/stream', tags=['Real-Time'])


@router.get('/events/{event_id}')
async def stream_event_updates(event_id: int, request: Request):
  """
  Endpoint for EventSource, holds connection and yields data.
  """

  async def event_generator():
    queue = await broadcaster.subscribe(event_id)
    try:
      while not await request.is_disconnected():
        yield await queue.get()

    except asyncio.CancelledError:
      pass
    finally:
      # Always clean up the queue to prevent memory leaks!
      broadcaster.unsubscribe(event_id, queue)

  return StreamingResponse(event_generator(), media_type='text/event-stream')
