from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
import schemas as global_schemas
from . import schemas as expense_schemas
from ..groups import schemas as group_schema  # noqa: F401
from ..users import schemas as user_schema  # noqa: F401
from ..events import schemas as event_schema  # noqa: F401
from . import service as crud

router = APIRouter(prefix='/expenses', tags=['Expenses'])


@router.post(
  '/',
  response_model=global_schemas.StandardResponse[expense_schemas.ExpenseResponse],
  status_code=201,
)
def create_expense(
  expense: expense_schemas.ExpenseCreate, db: Session = Depends(get_db)
):
  """Creates a new expense and links the owner, event, and participants."""

  db_event = crud.get_event_by_uuid(db, event_uuid=expense.event_id)
  if not db_event:
    raise HTTPException(status_code=404, detail='Event not found')

  db_owner = crud.get_user_by_uuid(db, user_uuid=expense.owner_id)
  if not db_owner:
    raise HTTPException(status_code=404, detail='Owner not found')

  db_expense = crud.create_expense(
    db=db, expense=expense, db_owner=db_owner, db_event=db_event
  )

  return global_schemas.success_response(data=db_expense, code=201)


@router.get(
  '/event/{event_uuid}',
  response_model=global_schemas.StandardResponse[List[expense_schemas.ExpenseResponse]],
  status_code=200,
)
def get_event_expenses(event_uuid: str, db: Session = Depends(get_db)):
  """Retrieves all expenses associated with a specific event."""
  db_event = crud.get_event_by_uuid(db, event_uuid=event_uuid)
  if not db_event:
    raise HTTPException(status_code=404, detail='Event not found')

  expenses = crud.get_expenses_by_event(db, db_event=db_event)
  return global_schemas.success_response(data=expenses, code=200)


@router.get(
  '/event/{event_uuid}/user/{user_uuid}',
  response_model=global_schemas.StandardResponse[List[expense_schemas.ExpenseResponse]],
  status_code=200,
)
def get_user_event_expenses(
  event_uuid: str, user_uuid: str, db: Session = Depends(get_db)
):
  """Retrieves all expenses for an event where the user is the owner or a participant."""
  db_event = crud.get_event_by_uuid(db, event_uuid=event_uuid)
  if not db_event:
    raise HTTPException(status_code=404, detail='Event not found')

  db_user = crud.get_user_by_uuid(db, user_uuid=user_uuid)
  if not db_user:
    raise HTTPException(status_code=404, detail='User not found')

  expenses = crud.get_user_expenses_for_event(db, db_event=db_event, db_user=db_user)
  return global_schemas.success_response(data=expenses, code=200)
