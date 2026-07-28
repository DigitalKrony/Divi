from sqlalchemy.orm import Session

from . import models
from . import schemas
from ..users.models import User


def get_group_by_uuid(db: Session, group_uuid: str):
  """Fetches a group by its UUID."""
  return db.query(models.Group).filter(models.Group.uuid == group_uuid).first()


def get_user_by_uuid(db: Session, user_uuid: str):
  """Helper to fetch a user when adding them to a group."""
  return db.query(User).filter(User.uuid == user_uuid).first()


def create_group(db: Session, group: schemas.GroupCreate):
  """Creates a new group in the database."""
  db_group = models.Group(**group.model_dump())
  db.add(db_group)
  db.commit()
  db.refresh(db_group)
  return db_group


def link_user_to_group(db: Session, group: models.Group, user: User):
  """Saves the association between a user and a group."""
  group.members.append(user)
  db.commit()
  db.refresh(group)
  return group
