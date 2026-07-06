from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas

router = APIRouter()

@router.post("/", response_model=schemas.StandardResponse[schemas.EventResponse])
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    """Creates a new event."""
    db_event = models.Event(**event.model_dump())
    
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.get("/{event_id}", response_model=schemas.StandardResponse[schemas.EventResponse])
def get_event(event_id: int, db: Session = Depends(get_db)):
    """Retrieves a specific event by its ID."""
    
    # Query the database for the event matching the ID
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    
    # Return a 404 error if the event doesn't exist
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
        
    return schemas.success_response(data=event, code=201)

@router.post("/{event_id}/users/{user_id}", response_model=schemas.StandardResponse[schemas.EventResponse])
def add_user_to_event(event_id: int, user_id: int, db: Session = Depends(get_db)):
    """Registers a user for an event."""
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    user = db.query(models.User).filter(models.User.id == user_id).first()
    
    if not event or not user:
        raise HTTPException(status_code=404, detail="Event or User not found")

    if user in event.users:
        raise HTTPException(status_code=400, detail="User is already registered for this event")

    event.users.append(user)
    db.commit()
    db.refresh(event)
    
    return schemas.success_response(data=event, code=201)

@router.get("/{event_id}/users", response_model=schemas.StandardResponse[schemas.UserResponse])
def get_event_users(event_id: int, db: Session = Depends(get_db)):
    """Retrieves all individual users registered for a specific event."""
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
        
    return schemas.success_response(data=event.users, code=201)

@router.post("/{event_id}/groups/{group_id}", response_model=schemas.StandardResponse[schemas.EventResponse])
def add_group_to_event(event_id: int, group_id: int, db: Session = Depends(get_db)):
    """Attaches an entire group to an event."""
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    group = db.query(models.Group).filter(models.Group.id == group_id).first()
    
    if not event or not group:
        raise HTTPException(status_code=404, detail="Event or Group not found")

    if group in event.groups:
        raise HTTPException(status_code=400, detail="Group is already attached to this event")

    event.groups.append(group)
    db.commit()
    db.refresh(event)

    return schemas.success_response(data=event, code=201)

@router.get("/{event_id}/groups", response_model=schemas.StandardResponse[schemas.GroupResponse])
def get_event_groups(event_id: int, db: Session = Depends(get_db)):
    """Retrieves all groups registered for a specific event."""
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
        
    return schemas.success_response(data=event.groups, code=201)
