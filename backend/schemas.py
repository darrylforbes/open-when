from typing import List
from pydantic import BaseModel


class MessageBase(BaseModel):
    title: str
    body: str


class MessageCreate(MessageBase):
    recipient_id: int
    sender_id: int


class Message(MessageBase):
    id: int
    recipient_id: int
    sender_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    received_messages: List[Message] = []
    sent_messages: List[Message] = []

    class Config:
        orm_mode = True
