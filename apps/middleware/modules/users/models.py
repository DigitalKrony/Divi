from sqlalchemy import (
  Column,
  Integer,
  String,
  ForeignKey,
  Enum,
  UniqueConstraint,
)
from sqlalchemy.orm import relationship
import enum
import uuid

from database import Base
from ..associations import (
  user_group_association,
  user_event_association,
  expense_participants,
)


class PayMethodEnum(str, enum.Enum):
  cash = 'Cash'
  venmo = 'Venmo'
  zelle = 'Zelle'


class User(Base):
  __tablename__ = 'users'

  id = Column(Integer, primary_key=True, index=True)
  uuid = Column(
    String(36),
    default=lambda: str(uuid.uuid4()),
    unique=True,
    index=True,
    nullable=False,
  )

  first_name = Column(String, index=True)
  last_name = Column(String, index=True)
  display_name = Column(String, index=True, unique=True)
  phone_number = Column(String)
  email_address = Column(String, unique=True, index=True)

  address = relationship(
    'Address', back_populates='owner', uselist=False, cascade='all, delete-orphan'
  )

  pay_accounts = relationship(
    'PayAccount', back_populates='owner', cascade='all, delete-orphan'
  )
  events = relationship(
    'Event', secondary=user_event_association, back_populates='users'
  )
  groups = relationship(
    'Group', secondary=user_group_association, back_populates='users'
  )
  owned_expenses = relationship('Expense', back_populates='owner')
  shared_expenses = relationship(
    'Expense', secondary=expense_participants, back_populates='participants'
  )


class Address(Base):
  __tablename__ = 'addresses'

  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey('users.id'), unique=True)

  address_line_1 = Column(String)
  address_line_2 = Column(String, nullable=True)
  city = Column(String)
  state = Column(String)
  zip_code = Column(String)

  owner = relationship('User', back_populates='address')


class PayAccount(Base):
  __tablename__ = 'pay_accounts'

  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey('users.id'))

  method = Column(Enum(PayMethodEnum))
  account_handle = Column(String)

  owner = relationship('User', back_populates='pay_accounts')

  __table_args__ = (UniqueConstraint('user_id', 'method', name='uq_user_pay_method'),)
