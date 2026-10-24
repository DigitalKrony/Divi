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

class ExpenseUpdate(BaseModel):
  title: Optional[str] = None
  description: Optional[str] = None
  date: Optional[datetime] = None
  amount: Optional[float] = None
  owner_id: Optional[str] = None
  event_id: Optional[str] = None
  participant_ids: Optional[List[str]] = None
