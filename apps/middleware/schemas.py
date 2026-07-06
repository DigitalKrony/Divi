from pydantic import BaseModel
from typing import List, Optional, Generic, TypeVar, Any
from datetime import datetime
from models import PayMethodEnum
import uuid

DataT = TypeVar('DataT')

def success_response(data: Any, code: int = 200) -> dict:
    return {
        "success": True,
        "data": data,
        "meta": {
            "code": code,
            "timestamp": datetime.utcnow(),
            "requestId": str(uuid.uuid4()),
            "error": None
        }
    }

def error_response(detail: str, code: int = 400) -> dict:
    return {
        "success": False,
        "data": None,
        "meta": {
            "code": code,
            "timestamp": datetime.utcnow(),
            "requestId": str(uuid.uuid4()),
            "error": detail
        }
    }

class UserBase(BaseModel):
    first_name: str
    last_name: str
    display_name: str
    phone_number: str
    email_address: str

class UserCreate(UserBase):
    address: Optional["AddressCreate"] = None
    pay_accounts: Optional[List["PayAccountCreate"]] = []

class UserResponse(UserBase):
    id: int
    
    address: Optional["AddressResponse"] = None
    pay_accounts: List["PayAccountResponse"] = []
    
    class Config:
        from_attributes = True

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
    
    class Config:
        from_attributes = True

class PayAccountBase(BaseModel):
    method: PayMethodEnum
    account_handle: str

class PayAccountCreate(PayAccountBase):
    pass

class PayAccountResponse(PayAccountBase):
    id: int
    user_id: int
    
    class Config:
        from_attributes = True

class GroupBase(BaseModel):
    name: str
    description: Optional[str] = None
    group_image: Optional[str] = None
    group_header_image: Optional[str] = None
    location: Optional[str] = None

class GroupCreate(GroupBase):
    pass

class GroupResponse(GroupBase):
    id: int
    users: List["UserResponse"] = []
    evens: List["EventResponse"] = []
        
    class Config:
        from_attributes = True

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    start_date: datetime
    end_date: datetime
    
    users: List["UserResponse"] = []
    groups: List["GroupResponse"] = []

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int
    
    class Config:
        from_attributes = True

class ResponseMeta(BaseModel):
    code: int
    timestamp: datetime
    requestId: str
    error: Optional[str] = None

class StandardResponse(BaseModel, Generic[DataT]):
    success: bool
    data: Optional[DataT] = None
    meta: ResponseMeta