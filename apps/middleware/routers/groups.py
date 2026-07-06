# apps/middleware/routers/groups.py
from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
import models, schemas

router = APIRouter()

@router.post("/", response_model=schemas.StandardResponse[schemas.GroupResponse])
def create_group(group: schemas.GroupCreate, db: Session = Depends(get_db)):
    """
    Creates a new group in the database.
    """

    db_group = models.Group(**group.model_dump())
    
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    
    return schemas.success_response(data=db_group, code=201)

@router.post("/{group_id}/members/{user_id}", response_model=schemas.StandardResponse[schemas.GroupResponse])
def add_user_to_group(group_id: int, user_id: int, db: Session = Depends(get_db)):
    """
    Links an existing user to an existing group.
    """
    
    group = db.query(models.Group).filter(models.Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user in group.members:
        raise HTTPException(status_code=400, detail="User is already a member of this group")

    group.members.append(user)
    
    db.commit()
    db.refresh(group)
    
    return schemas.success_response(data=group, code=201)

@router.get("/{group_id}/members", response_model=schemas.StandardResponse[schemas.UserResponse])
def get_group_members(group_id: int, db: Session = Depends(get_db)):
    """
    Retrieves all users that are members of a specific group.
    """
    
    group = db.query(models.Group).filter(models.Group.id == group_id).first()
    
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
        
    return schemas.success_response(data=group.members, code=201)

@router.get("/{group_id}/events", response_model=schemas.StandardResponse[schemas.EventResponse])
def get_group_events(group_id: int, db: Session = Depends(get_db)):
    """
    Retrieves all events that are associated with a specific group.
    """
    
    group = db.query(models.Group).filter(models.Group.id == group_id).first()
    
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
        
    return schemas.success_response(data=group.events, code=201)
