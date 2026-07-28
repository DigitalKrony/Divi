from sqlalchemy import (
  Column,
  Integer,
  ForeignKey,
  Table,
)
from database import Base

user_group_association = Table(
  'user_group_link',
  Base.metadata,
  Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
  Column('group_id', Integer, ForeignKey('groups.id'), primary_key=True),
)

user_event_association = Table(
  'user_event_link',
  Base.metadata,
  Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
  Column('event_id', Integer, ForeignKey('events.id'), primary_key=True),
)

event_group_association = Table(
  'event_group_link',
  Base.metadata,
  Column('event_id', Integer, ForeignKey('events.id'), primary_key=True),
  Column('group_id', Integer, ForeignKey('groups.id'), primary_key=True),
)

expense_participants = Table(
  'expense_participants',
  Base.metadata,
  Column(
    'expense_id',
    Integer,
    ForeignKey('expenses.id', ondelete='CASCADE'),
    primary_key=True,
  ),
  Column(
    'user_id', Integer, ForeignKey('users.id', ondelete='CASCADE'), primary_key=True
  ),
)
