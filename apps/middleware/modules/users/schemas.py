from pydantic import BaseModel, ConfigDict
from typing import List, Optional

from .models import PayMethodEnum


class UserBase(BaseModel):
  display_name: str
  first_name: str
  last_name: str
  phone_number: str
  email_address: str


class UserCreate(UserBase):
  display_name: str
  first_name: str
  last_name: str
  email_address: str
  password: str
  address: Optional['AddressCreate'] = None
  pay_accounts: Optional[List['PayAccountCreate']] = []


class UserResponse(UserBase):
  uuid: str
  id: int

  address: Optional['AddressResponse'] = None
  pay_accounts: List['PayAccountResponse'] = []

  model_config = ConfigDict(from_attributes=True)


class AddressBase(BaseModel):
  address_line_1: str
  address_line_2: Optional[str] = None
  city: str
  state: str
  zip_code: str


class AddressCreate(AddressBase):
  pass


class AddressResponse(AddressBase):
  id: int
  user_id: int

  model_config = ConfigDict(from_attributes=True)


class PayAccountBase(BaseModel):
  method: PayMethodEnum
  account_handle: str


class PayAccountCreate(PayAccountBase):
  pass


class PayAccountResponse(PayAccountBase):
  id: int
  user_id: int

  model_config = ConfigDict(from_attributes=True)
