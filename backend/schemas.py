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
    username: str


class UserCreate(UserBase):
    email: str
    password: str


class UserPublic(UserBase):
    id: int


class User(UserBase):
    id: int
    email: str
    received_messages: List[Message] = []
    sent_messages: List[Message] = []

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str
