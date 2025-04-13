from pydantic import BaseModel, EmailStr
from typing import List


class Deal(BaseModel):
    client: str
    value: int
    status: str


class Client(BaseModel):
    name: str
    industry: str
    contact: EmailStr 


class SalesRep(BaseModel):
    id: int
    name: str
    role: str
    region: str
    skills: List[str]
    deals: List[Deal]
    clients: List[Client]