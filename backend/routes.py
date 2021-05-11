from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import crud, schemas


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close


@router.get('/users/{user_id}/messages')
def read_user_messages(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.read_user(user_id=user_id, db=db)
    if not db_user:
        raise HTTPException(status_code=400, detail="User does not exist")
    return db_user.received_messages


@router.get('/users/{user_id}')
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.read_user(user_id=user_id, db=db)
    if not db_user:
        raise HTTPException(status_code=400, detail="User does not exist")
    return db_user


@router.get('/users')
def read_all_users(db: Session = Depends(get_db)):
    return crud.read_all_users(db=db)


@router.post('/users')
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.read_user_by_email(email=user.email, db=db)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(user=user, db=db)


@router.get('/messages/{message_id}')
def read_message(message_id: int, q: str = None):
    # TODO
    return {'message_id': message_id, 'q': q}


@router.get('/messages')
def read_all_messages(db: Session = Depends(get_db)):
    return crud.read_all_messages(db=db)


@router.post('/messages')
def create_message(message: schemas.MessageCreate,
                   db: Session = Depends(get_db)):
    msg = crud.create_message(message=message, db=db)
    if not msg:
        raise HTTPException(status_code=400, detail="Email already registered")
    return msg
