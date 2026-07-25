from sqlalchemy.orm import Session

from . import models
from . import schemas
from ..users.models import User
from ..groups.models import Group
from ..events.models import Event


def get_event_by_uuid(db: Session, event_uuid: str):
  """Fetches an event by its UUID."""
  return db.query(Event).filter(Event.uuid == event_uuid).first()


def create_event(db: Session, event: schemas.EventCreate):
  """Creates a new event."""
  db_event = Event(**event.model_dump())
  db.add(db_event)
  db.commit()
  db.refresh(db_event)
  return db_event


def get_user_by_uuid(db: Session, user_uuid: str):
  """Helper to fetch a user when linking to an event."""
  return db.query(User).filter(User.uuid == user_uuid).first()


def get_group_by_uuid(db: Session, group_uuid: str):
  """Helper to fetch a group when linking to an event."""
  return db.query(Group).filter(Group.uuid == group_uuid).first()


def link_user_to_event(db: Session, event: models.Event, user: User):
  """Saves the association between a user and an event."""
  event.users.append(user)
  db.commit()
  db.refresh(event)
  return event


def link_group_to_event(db: Session, event: models.Event, group: Group):
  """Saves the association between a group and an event."""
  event.groups.append(group)
  db.commit()
  db.refresh(event)
  return event
