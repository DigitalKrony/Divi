from sqlalchemy.orm import Session

from . import models
from . import schemas


def get_user_by_email(db: Session, email_address: str):
  """Fetches a user by their exact email address."""
  return (
    db.query(models.User).filter(models.User.email_address == email_address).first()
  )


def get_user_by_uuid(db: Session, user_uuid: str):
  """Fetches a user by their UUID."""
  return db.query(models.User).filter(models.User.uuid == user_uuid).first()


def create_user(db: Session, user: schemas.UserCreate):
  """Creates a new user, including their address and pay accounts."""
  db_user = models.User(
    first_name=user.first_name,
    last_name=user.last_name,
    display_name=user.display_name,
    phone_number=user.phone_number,
    email_address=user.email_address,
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

  return db_user

def update_user(db: Session, user_uuid: str, update_data: schemas.UserUpdate):
  """Updates a user by their UUID."""
  db_obj = get_user_by_uuid(db, user_uuid)
  if not db_obj:
    return None
  
  update_dict = update_data.model_dump(exclude_unset=True)
  
  for key, value in update_dict.items():
    setattr(db_obj, key, value)
    
  db.commit()
  db.refresh(db_obj)
  return db_obj
