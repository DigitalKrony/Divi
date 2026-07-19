from pydantic import BaseModel, ConfigDict
from typing import List, Optional

# pyright: reportUndefinedVariable=false


class GroupBase(BaseModel):
  name: str
  description: Optional[str] = None
  group_image: Optional[str] = None
  group_header_image: Optional[str] = None
  location: Optional[str] = None


class GroupCreate(GroupBase):
  pass


class GroupResponse(GroupBase):
  id: int
  uuid: str

  members: List['UserBase'] = []  # noqa: F821
  evens: List['EventBase'] = []  # noqa: F821

  model_config = ConfigDict(from_attributes=True)
