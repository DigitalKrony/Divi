from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
import schemas as global_schemas
from . import schemas as user_schema
from ..groups import schemas as group_schema
from ..events import schemas as event_schema
from . import service as crud

router = APIRouter(prefix='/users', tags=['Users'])


@router.post(
  '/',
  response_model=global_schemas.StandardResponse[user_schema.UserResponse],
  status_code=201,
)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
  existing_user = crud.get_user_by_email(db, email_address=user.email_address)

  if existing_user:
    raise HTTPException(status_code=400, detail='Email already registered')

  db_user = crud.create_user(db=db, user=user)

  return global_schemas.success_response(data=db_user, code=201)


@router.get(
  '/{user_uuid}',
  response_model=global_schemas.StandardResponse[user_schema.UserResponse],
  status_code=200,
)
def get_user(user_uuid: str, db: Session = Depends(get_db)):
  """
  Retrieves a specific user by their UUID, including their address,
  pay accounts, events, and groups.
  """
  user = crud.get_user_by_uuid(db, user_uuid=user_uuid)
  if not user:
    raise HTTPException(status_code=404, detail='User not found')

  return global_schemas.success_response(data=user, code=200)


@router.get(
  '/{user_uuid}/groups',
  response_model=global_schemas.StandardResponse[List[group_schema.GroupResponse]],
  status_code=200,
)
def get_user_groups(user_uuid: str, db: Session = Depends(get_db)):
  """
  Retrieves all groups that a specific user is a member of.
  """
  user = crud.get_user_by_uuid(db, user_uuid=user_uuid)
  if not user:
    raise HTTPException(status_code=404, detail='User not found')

  return global_schemas.success_response(data=user.groups, code=200)


@router.get(
  '/{user_uuid}/events',
  response_model=global_schemas.StandardResponse[List[event_schema.EventResponse]],
  status_code=200,
)
def get_user_events(user_uuid: str, db: Session = Depends(get_db)):
  """
  Retrieves all events that a specific user is registered for.
  """
  user = crud.get_user_by_uuid(db, user_uuid=user_uuid)
  if not user:
    raise HTTPException(status_code=404, detail='User not found')

  return global_schemas.success_response(data=user.events, code=200)
