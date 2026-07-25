from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
import schemas as global_schemas
from . import schemas as event_schema
from ..groups import schemas as group_schema  # noqa: F401
from ..users import schemas as user_schema  # noqa: F401
from . import service as crud


router = APIRouter(prefix='/events', tags=['Events'])


@router.post(
  '/',
  response_model=global_schemas.StandardResponse[event_schema.EventResponse],
  status_code=201,
)
def create_event(event: event_schema.EventCreate, db: Session = Depends(get_db)):
  """Creates a new event."""
  db_event = crud.create_event(db=db, event=event)
  return global_schemas.success_response(data=db_event, code=201)


@router.get(
  '/{event_uuid}',
  response_model=global_schemas.StandardResponse[event_schema.EventResponse],
  status_code=200,
)
def get_event(event_uuid: str, db: Session = Depends(get_db)):
  """Retrieves a specific event by its UUID."""
  event = crud.get_event_by_uuid(db, event_uuid=event_uuid)

  if not event:
    raise HTTPException(status_code=404, detail='Event not found')

  return global_schemas.success_response(data=event, code=200)


@router.post(
  '/{event_uuid}/users/{user_uuid}',
  response_model=global_schemas.StandardResponse[event_schema.EventResponse],
  status_code=201,
)
def add_user_to_event(event_uuid: str, user_uuid: str, db: Session = Depends(get_db)):
  """Registers a user for an event."""
  event = crud.get_event_by_uuid(db, event_uuid=event_uuid)
  user = crud.get_user_by_uuid(db, user_uuid=user_uuid)

  if not event or not user:
    raise HTTPException(status_code=404, detail='Event or User not found')

  if user in event.users:
    raise HTTPException(
      status_code=400, detail='User is already registered for this event'
    )

  updated_event = crud.link_user_to_event(db=db, event=event, user=user)
  return global_schemas.success_response(data=updated_event, code=201)


@router.get(
  '/{event_uuid}/users',
  response_model=global_schemas.StandardResponse[List[user_schema.UserResponse]],
  status_code=200,
)
def get_event_users(event_uuid: str, db: Session = Depends(get_db)):
  """Retrieves all individual users registered for a specific event."""
  event = crud.get_event_by_uuid(db, event_uuid=event_uuid)

  if not event:
    raise HTTPException(status_code=404, detail='Event not found')

  return global_schemas.success_response(data=event.users, code=200)


@router.post(
  '/{event_uuid}/groups/{group_uuid}',
  response_model=global_schemas.StandardResponse[event_schema.EventResponse],
  status_code=201,
)
def add_group_to_event(event_uuid: str, group_uuid: str, db: Session = Depends(get_db)):
  """Attaches an entire group to an event."""
  event = crud.get_event_by_uuid(db, event_uuid=event_uuid)
  group = crud.get_group_by_uuid(db, group_uuid=group_uuid)

  if not event or not group:
    raise HTTPException(status_code=404, detail='Event or Group not found')

  if group in event.groups:
    raise HTTPException(
      status_code=400, detail='Group is already attached to this event'
    )

  updated_event = crud.link_group_to_event(db=db, event=event, group=group)
  return global_schemas.success_response(data=updated_event, code=201)


@router.get(
  '/{event_uuid}/groups',
  response_model=global_schemas.StandardResponse[List[group_schema.GroupResponse]],
  status_code=200,
)
def get_event_groups(event_uuid: str, db: Session = Depends(get_db)):
  """Retrieves all groups registered for a specific event."""
  event = crud.get_event_by_uuid(db, event_uuid=event_uuid)

  if not event:
    raise HTTPException(status_code=404, detail='Event not found')

  return global_schemas.success_response(data=event.groups, code=200)
