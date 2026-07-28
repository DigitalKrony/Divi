from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime


class EventBase(BaseModel):
  title: str
  description: Optional[str] = None
  location: Optional[str] = None
  start_date: datetime
  end_date: datetime

  users: List['UserBase'] = []  # noqa: F821
  groups: List['GroupBase'] = []  # noqa: F821


class EventCreate(EventBase):
  pass


class EventResponse(EventBase):
  id: int
  uuid: str
  created_at: datetime
  updated_at: datetime
  expenses: List['ExpenseBase'] = []  # noqa: F821

  model_config = ConfigDict(from_attributes=True)
