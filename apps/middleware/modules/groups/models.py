from sqlalchemy import (
  Column,
  Integer,
  String,
  DateTime,
)
from sqlalchemy.orm import relationship
import uuid

from database import Base
from ..associations import user_group_association, event_group_association


class Group(Base):
  __tablename__ = 'groups'

  id = Column(Integer, primary_key=True, index=True)
  uuid = Column(
    String(36),
    default=lambda: str(uuid.uuid4()),
    unique=True,
    index=True,
    nullable=False,
  )

  created_at = Column(DateTime)
  updated_at = Column(DateTime)

  name = Column(String, index=True)
  description = Column(String, nullable=True)

  group_image = Column(String, nullable=True)
  group_header_image = Column(String, nullable=True)

  location = Column(String, nullable=True)

  users = relationship(
    'User', secondary=user_group_association, back_populates='groups'
  )
  events = relationship(
    'Event', secondary=event_group_association, back_populates='groups'
  )
