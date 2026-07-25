from sqlalchemy import (
  Column,
  Integer,
  String,
  DateTime,
  func,
)
from sqlalchemy.orm import relationship
import uuid

from database import Base
from ..associations import user_event_association, event_group_association


class Event(Base):
  __tablename__ = 'events'

  id = Column(Integer, primary_key=True, index=True)
  uuid = Column(
    String(36),
    default=lambda: str(uuid.uuid4()),
    unique=True,
    index=True,
    nullable=False,
  )

  title = Column(String, index=True)
  description = Column(String, nullable=True)
  location = Column(String, nullable=True)

  created_at = Column(DateTime, server_default=func.now(), nullable=False)
  updated_at = Column(
    DateTime, server_default=func.now(), onupdate=func.now(), nullable=False
  )

  start_date = Column(DateTime)
  end_date = Column(DateTime)

  users = relationship(
    'User', secondary=user_event_association, back_populates='events'
  )
  groups = relationship(
    'Group', secondary=event_group_association, back_populates='events'
  )
  expenses = relationship('Expense', back_populates='event')
