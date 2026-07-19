from sqlalchemy.orm import Session
from sqlalchemy import or_

from . import models
from . import schemas
from ..users.models import User
from ..events.models import Event


def get_event_by_uuid(db: Session, event_uuid: str):
  """Helper to validate an event exists."""
  return db.query(Event).filter(Event.uuid == event_uuid).first()


def get_user_by_uuid(db: Session, user_uuid: str):
  """Helper to validate a user exists."""
  return db.query(User).filter(User.uuid == user_uuid).first()


def create_expense(
  db: Session,
  expense: schemas.ExpenseCreate,
  db_owner: User,
  db_event: Event,
):
  """Creates the expense and links all participants in the database."""
  expense_data = expense.model_dump(exclude={'participant_ids', 'owner_id', 'event_id'})

  # Create the expense using the actual internal database IDs
  db_expense = models.Expense(
    **expense_data, owner_id=db_owner.id, event_id=db_event.id
  )

  if expense.participant_ids:
    participants = (
      db.query(models.User).filter(User.uuid.in_(expense.participant_ids)).all()
    )
    db_expense.participants.extend(participants)

  db.add(db_expense)
  db.commit()
  db.refresh(db_expense)

  return db_expense


def get_expenses_by_event(db: Session, db_event: Event):
  """Fetches all expenses associated with a specific event."""
  return db.query(models.Expense).filter(models.Expense.event_id == db_event.id).all()


def get_user_expenses_for_event(db: Session, db_event: Event, db_user: User):
  """Fetches expenses for a specific event where the user is the owner or a participant."""
  return (
    db.query(models.Expense)
    .filter(models.Expense.event_id == db_event.id)
    .filter(
      or_(
        models.Expense.owner_id == db_user.id,
        models.Expense.participants.any(User.id == db_user.id),
      )
    )
    .all()
  )
