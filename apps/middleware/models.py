from sqlalchemy import Column, Integer, String, ForeignKey, Enum, UniqueConstraint, Table, DateTime
from sqlalchemy.orm import relationship
from database import Base
import enum

user_group_association = Table(
    "user_group_link",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("group_id", Integer, ForeignKey("groups.id"), primary_key=True)
)

user_event_association = Table(
    "user_event_link",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("event_id", Integer, ForeignKey("events.id"), primary_key=True)
)

event_group_association = Table(
    "event_group_link",
    Base.metadata,
    Column("event_id", Integer, ForeignKey("events.id"), primary_key=True),
    Column("group_id", Integer, ForeignKey("groups.id"), primary_key=True)
)

class PayMethodEnum(str, enum.Enum):
    cash = "Cash"
    venmo = "Venmo"
    zelle = "Zelle"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    display_name = Column(String, index=True, unique=True)
    phone_number = Column(String)
    email_address = Column(String, unique=True, index=True)

    address = relationship("Address", back_populates="owner", uselist=False, cascade="all, delete-orphan")
    
    pay_accounts = relationship("PayAccount", back_populates="owner", cascade="all, delete-orphan")

    events = relationship("Event", secondary=user_event_association, back_populates="users")
    groups = relationship("Group", secondary=user_group_association, back_populates="users")

class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True) 
    
    address_line_1 = Column(String)
    address_line_2 = Column(String, nullable=True)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)

    owner = relationship("User", back_populates="address")

class PayAccount(Base):
    __tablename__ = "pay_accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    method = Column(Enum(PayMethodEnum))
    account_handle = Column(String)

    owner = relationship("User", back_populates="pay_accounts")

    __table_args__ = (
        UniqueConstraint('user_id', 'method', name='uq_user_pay_method'),
    )

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    location = Column(String, nullable=True)
    
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    
    users = relationship("User", secondary=user_event_association, back_populates="events")
    groups = relationship("Group", secondary=event_group_association, back_populates="events")

class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    
    group_image = Column(String, nullable=True) 
    group_header_image = Column(String, nullable=True)
    
    location = Column(String, nullable=True)

    users = relationship("User", secondary=user_group_association, back_populates="groups")
    events = relationship("Event", secondary=event_group_association, back_populates="groups")
