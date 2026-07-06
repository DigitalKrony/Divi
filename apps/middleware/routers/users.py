from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas

router = APIRouter()

@router.post("/", response_model=schemas.StandardResponse[schemas.UserResponse])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email_address == user.email_address).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        display_name=user.display_name,
        phone_number=user.phone_number,
        email_address=user.email_address
    )
    
    if user.address:
        db_address = models.Address(**user.address.model_dump())
        db_user.address = db_address

    for pay in user.pay_accounts:
        db_pay = models.PayAccount(**pay.model_dump())
        db_user.pay_accounts.append(db_pay)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return schemas.success_response(data=db_user, code=201)

@router.get("/{user_id}", response_model=schemas.StandardResponse[schemas.UserResponse])
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Retrieves a specific user by their ID, including their address, 
    pay accounts, events, and groups.
    """
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return schemas.success_response(data=user, code=201)

@router.get("/{user_id}/groups", response_model=schemas.StandardResponse[schemas.GroupResponse])
def get_user_groups(user_id: int, db: Session = Depends(get_db)):
    """
    Retrieves all groups that a specific user is a member of.
    """
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return schemas.success_response(data=user.groups, code=201)


@router.get("/{user_id}/events", response_model=schemas.StandardResponse[schemas.EventResponse])
def get_user_events(user_id: int, db: Session = Depends(get_db)):
    """
    Retrieves all events that a specific user is registered for.
    """
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return schemas.success_response(data=user.events, code=201)
