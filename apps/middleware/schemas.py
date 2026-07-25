from pydantic import BaseModel
from typing import Optional, Generic, TypeVar, Any
from datetime import datetime, timezone
import uuid

DataT = TypeVar('DataT')


def success_response(data: Any, code: int = 200) -> dict:
  return {
    'success': True,
    'data': data,
    'meta': {
      'code': code,
      'timestamp': datetime.now(timezone.utc),
      'requestId': str(uuid.uuid4()),
      'error': None,
    },
  }


def error_response(detail: str, code: int = 400) -> dict:
  return {
    'success': False,
    'data': None,
    'meta': {
      'code': code,
      'timestamp': datetime.now(timezone.utc),
      'requestId': str(uuid.uuid4()),
      'error': detail,
    },
  }


class ResponseMeta(BaseModel):
  code: int
  timestamp: datetime
  requestId: str
  error: Optional[str] = None


class StandardResponse(BaseModel, Generic[DataT]):
  success: bool
  data: Optional[DataT] = None
  meta: ResponseMeta
