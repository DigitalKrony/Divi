from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime


class ExpenseBase(BaseModel):
  title: str
  description: str
  date: Optional[datetime] = None
  amount: float


class ExpenseCreate(ExpenseBase):
  owner_id: str
  event_id: str
  participant_ids: List[str] = []


class ExpenseResponse(ExpenseBase):
  id: int
  uuid: str
  created_at: datetime

  owner: Optional['UserBase'] = None  # noqa: F821
  participants: List['UserBase'] = []  # noqa: F821

  model_config = ConfigDict(from_attributes=True)
