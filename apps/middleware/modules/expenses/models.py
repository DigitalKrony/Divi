from sqlalchemy import (
  Column,
  Integer,
  String,
  ForeignKey,
  DateTime,
  Float,
  func,
)
from sqlalchemy.orm import relationship
import uuid

from database import Base
from ..associations import expense_participants


class Expense(Base):
  __tablename__ = 'expenses'

  id = Column(Integer, primary_key=True, index=True)
  uuid = Column(
    String(36),
    default=lambda: str(uuid.uuid4()),
    unique=True,
    index=True,
    nullable=False,
  )

  title = Column(String, index=True)
  description = Column(String)
  date = Column(DateTime, nullable=True)
  amount = Column(Float, nullable=False)

  created_at = Column(DateTime, server_default=func.now(), nullable=False)

  owner_id = Column(Integer, ForeignKey('users.id'))
  owner = relationship('User', back_populates='owned_expenses')

  event_id = Column(Integer, ForeignKey('events.id'))
  event = relationship('Event', back_populates='expenses')

  participants = relationship(
    'User', secondary=expense_participants, back_populates='shared_expenses'
  )
