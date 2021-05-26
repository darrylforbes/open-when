import os
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.encoders import jsonable_encoder
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from database import SessionLocal
import crud
import models
import schemas


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close


def read_user(user_id: int, db: Session):
    return db.query(models.User).filter(models.User.id == user_id).first()


def read_current_user(token: str = Depends(oauth2_scheme),
                      db: str = Depends(get_db)):
    exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Invalid authentication credentials',
        headers={'WWW-Authenticate': 'Bearer'}
    )
    try:
        payload = jwt.decode(token, os.environ['SECRET_KEY'],
                             algorithms=['HS256'])
        username = payload.get('sub')
        if username is None:
            raise exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise exception

    user = crud.read_user_by_username(username=token_data.username, db=db)
    if user is None:
        raise exception

    return user


def read_users(db: Session):
    return db.query(models.User).all()


def read_user_by_email(email: str, db: Session):
    return db.query(models.User).filter(models.User.email == email).first()


def read_user_by_username(username: str, db: Session):
    return db.query(models.User).filter(
        models.User.username == username).first()


def authenticate_user(username: str, password: str, db: Session):
    user = crud.read_user_by_username(username=username, db=db)
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user


def create_user(user: schemas.UserCreate, pwd_context, db: Session):
    hashed_password = pwd_context.hash(user.password)
    user = models.User(username=user.username, email=user.email,
                       hashed_password=hashed_password,
                       received_messages=[], sent_messages=[])
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def read_message(msg_id: int, db: Session):
    return db.query(models.Message).filter(models.Message.id == msg_id).first()


def update_message(msg: models.Message, msg_new: schemas.MessageCreate,
                   db: Session):
    data = jsonable_encoder(msg)
    new_data = msg_new.dict()
    for field in data:
        if field in new_data:
            setattr(msg, field, new_data[field])
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


def delete_message(msg: schemas.Message, db: Session):
    db.delete(msg)
    db.commit()
    return msg


def read_messages(db: Session):
    return db.query(models.Message).all()


def create_message(message: schemas.MessageCreate, db: Session):
    db_message = models.Message(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, os.environ['SECRET_KEY'], algorithm='HS256')
