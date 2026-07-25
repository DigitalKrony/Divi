from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
import schemas as global_schemas
from . import schemas as group_schema
from ..users import schemas as user_schema
from ..events import schemas as event_schema
from . import service as crud


router = APIRouter(prefix='/groups', tags=['Groups'])


@router.post(
  '/',
  response_model=global_schemas.StandardResponse[group_schema.GroupResponse],
  status_code=201,
)
def create_group(group: group_schema.GroupCreate, db: Session = Depends(get_db)):
  """Creates a new group."""
  db_group = crud.create_group(db=db, group=group)
  return global_schemas.success_response(data=db_group, code=201)


@router.post(
  '/{group_uuid}/members/{user_uuid}',
  response_model=global_schemas.StandardResponse[group_schema.GroupResponse],
  status_code=201,
)
def add_user_to_group(group_uuid: str, user_uuid: str, db: Session = Depends(get_db)):
  """Links an existing user to an existing group."""
  group = crud.get_group_by_uuid(db, group_uuid=group_uuid)
  if not group:
    raise HTTPException(status_code=404, detail='Group not found')

  user = crud.get_user_by_uuid(db, user_uuid=user_uuid)
  if not user:
    raise HTTPException(status_code=404, detail='User not found')

  if user in group.members:
    raise HTTPException(
      status_code=400, detail='User is already a member of this group'
    )

  updated_group = crud.link_user_to_group(db=db, group=group, user=user)
  return global_schemas.success_response(data=updated_group, code=201)


@router.get(
  '/{group_uuid}/members',
  response_model=global_schemas.StandardResponse[List[user_schema.UserResponse]],
  status_code=200,
)
def get_group_members(group_uuid: str, db: Session = Depends(get_db)):
  """Retrieves all users that are members of a specific group."""
  group = crud.get_group_by_uuid(db, group_uuid=group_uuid)
  if not group:
    raise HTTPException(status_code=404, detail='Group not found')

  return global_schemas.success_response(data=group.members, code=200)


@router.get(
  '/{group_uuid}/events',
  response_model=global_schemas.StandardResponse[List[event_schema.EventResponse]],
  status_code=200,
)
def get_group_events(group_uuid: str, db: Session = Depends(get_db)):
  """Retrieves all events that are associated with a specific group."""
  group = crud.get_group_by_uuid(db, group_uuid=group_uuid)
  if not group:
    raise HTTPException(status_code=404, detail='Group not found')

  return global_schemas.success_response(data=group.events, code=200)
