import os
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from database import SessionLocal
import crud, schemas


router = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close


def authenticate_user(username: str, password: str, db: Session):
    user = crud.read_user_by_username(username=username, db=db)
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, os.environ['SECRET_KEY'], algorithm='HS256')


def get_current_user(token: str = Depends(oauth2_scheme),
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


@router.get('/users/{user_id}/inbox', response_model=list[schemas.Message])
def read_user_inbox(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.read_user(user_id=user_id, db=db)
    if not db_user:
        raise HTTPException(status_code=404, detail='User does not exist')
    return db_user.received_messages


@router.get('/users/{user_id}/sent', response_model=list[schemas.Message])
def read_user_sent(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.read_user(user_id=user_id, db=db)
    if not db_user:
        raise HTTPException(status_code=404, detail='User does not exist')
    return db_user.sent_messages


@router.get('/users/me', response_model=schemas.User)
def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user


@router.get('/users/{user_id}', response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.read_user(user_id=user_id, db=db)
    if not db_user:
        raise HTTPException(status_code=404, detail='User does not exist')
    return db_user


@router.get('/users', response_model=list[schemas.User])
def read_all_users(db: Session = Depends(get_db)):
    return crud.read_all_users(db=db)


@router.post('/users', response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.read_user_by_username(username=user.username, db=db)
    if db_user:
        raise HTTPException(status_code=400, detail='Username taken')
    db_user = crud.read_user_by_email(email=user.email, db=db)
    if db_user:
        raise HTTPException(status_code=400, detail='Email already registered')
    return crud.create_user(user=user, pwd_context=pwd_context, db=db)


@router.get('/messages/{message_id}', response_model=schemas.Message)
def read_message(message_id: int, db: Session = Depends(get_db)):
    return crud.read_message(msg_id=message_id, db=db)


@router.get('/messages', response_model=list[schemas.Message])
def read_all_messages(db: Session = Depends(get_db)):
    return crud.read_all_messages(db=db)


@router.post('/messages', response_model=schemas.Message)
def create_message(message: schemas.MessageCreate,
                   db: Session = Depends(get_db)):
    msg = crud.create_message(message=message, db=db)
    if not msg:
        raise HTTPException(status_code=400, detail='Error creating message')
    return msg


@router.post('/token')
def login(form_data: OAuth2PasswordRequestForm = Depends(),
          db: Session = Depends(get_db)):
    user = crud.read_user_by_username(username=form_data.username, db=db)
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid authentication credentials',
            headers={'WWW-Authenticate': 'Bearer'}
        )
    access_token = create_access_token({'sub': user.username})

    return {'access_token': access_token, 'token_type': 'bearer'}
