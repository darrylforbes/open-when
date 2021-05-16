from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    body = Column(String)
    recipient_id = Column(Integer, ForeignKey('users.id'))
    sender_id = Column(Integer, ForeignKey('users.id'))

    recipient = relationship('User', foreign_keys=[recipient_id],
                             back_populates='received_messages')
    sender = relationship('User', foreign_keys=[sender_id],
                          back_populates='sent_messages')


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    received_messages = relationship('Message',
                                     foreign_keys=[Message.recipient_id],
                                     back_populates='recipient')
    sent_messages = relationship('Message',
                                 foreign_keys=[Message.sender_id],
                                 back_populates='sender')
