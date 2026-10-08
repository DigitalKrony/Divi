import asyncio
import json


class SSEBroadcaster:
  def __init__(self):
    self.active_connections: dict[int, list[asyncio.Queue]] = {}

  async def subscribe(self, event_id: int) -> asyncio.Queue:
    """Create a new queue for a client and attach it to the event_id."""
    queue = asyncio.Queue()
    if event_id not in self.active_connections:
      self.active_connections[event_id] = []

    self.active_connections[event_id].append(queue)
    return queue

  def unsubscribe(self, event_id: int, queue: asyncio.Queue):
    """Clean up the queue when the client disconnects."""
    if event_id in self.active_connections:
      self.active_connections[event_id].remove(queue)
      if not self.active_connections[event_id]:
        del self.active_connections[event_id]

  async def publish(self, event_id: int, message: dict):
    """Push a message to all connected clients listening to this event_id."""
    if event_id in self.active_connections:
      sse_message = f'data: {json.dumps(message)}\n\n'
      for queue in self.active_connections[event_id]:
        await queue.put(sse_message)


# Create the globally shared instance
broadcaster = SSEBroadcaster()
