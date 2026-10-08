from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.orm import Session

import schemas as global_schemas
from database import get_db
from modules.stream.broadcaster import broadcaster

from ..events import schemas as event_schema  # noqa: F401
from ..groups import schemas as group_schema  # noqa: F401
from ..users import schemas as user_schema  # noqa: F401
from . import schemas as expense_schema
from . import service as crud

router = APIRouter(prefix='/expenses', tags=['Expenses'])


@router.post(
  '/',
  response_model=global_schemas.StandardResponse[expense_schema.ExpenseResponse],
  status_code=201,
)
def create_expense(
  expense: expense_schema.ExpenseCreate,
  background_tasks: BackgroundTasks,  # 1. Add BackgroundTasks here
  db: Session = Depends(get_db),
):
  """
  Creates a new expense and links the owner, event, and participants.
  """

  db_event = crud.get_event_by_uuid(db, event_uuid=expense.event_id)
  if not db_event:
    raise HTTPException(status_code=404, detail='Event not found')

  db_owner = crud.get_user_by_uuid(db, user_uuid=expense.owner_id)
  if not db_owner:
    raise HTTPException(status_code=404, detail='Owner not found')

  db_expense = crud.create_expense(
    db=db, expense=expense, db_owner=db_owner, db_event=db_event
  )

  broadcast_data = {
    'action': 'EXPENSE_CREATED',
    'entity': 'expense',
    'event_uuid': str(expense.event_id),
    'expense_id': str(db_expense.id),
  }

  background_tasks.add_task(
    broadcaster.publish, event_id=expense.event_id, message=broadcast_data
  )

  return global_schemas.success_response(data=db_expense, code=201)


@router.get(
  '/event/{event_uuid}',
  response_model=global_schemas.StandardResponse[list[expense_schema.ExpenseResponse]],
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
  response_model=global_schemas.StandardResponse[list[expense_schema.ExpenseResponse]],
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


@router.put(
  '/{expense_uuid}',
  response_model=global_schemas.StandardResponse[expense_schema.ExpenseResponse],
  status_code=200,
)
def update_expense(
  expense_uuid: str,
  update_data: expense_schema.ExpenseUpdate,
  db: Session = Depends(get_db),
):
  """Updates a expense."""
  db_obj = crud.update_expense(db, expense_uuid, update_data)
  if not db_obj:
    raise HTTPException(status_code=404, detail='Expense not found')

  return global_schemas.success_response(data=db_obj, code=200)
