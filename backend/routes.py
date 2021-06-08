from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import crud
import schemas


router = APIRouter()


@router.get('/users/{username}/inbox', response_model=list[schemas.Message])
def read_user_inbox(username: str, db: Session = Depends(crud.get_db)):
    user = crud.read_user_by_username(username=username, db=db)
    if not user:
        raise HTTPException(status_code=404, detail='User does not exist')
    return user.received_messages


@router.get('/users/{username}/sent', response_model=list[schemas.Message])
def read_user_sent(username: str, db: Session = Depends(crud.get_db)):
    user = crud.read_user_by_username(username=username, db=db)
    if not user:
        raise HTTPException(status_code=404, detail='User does not exist')
    return user.sent_messages


@router.get('/users/me', response_model=schemas.User)
def read_users_me(current_user: schemas.User
                  = Depends(crud.read_current_user)):
    return current_user


@router.get('/users/{username}', response_model=schemas.User)
def read_user(username: str, db: Session = Depends(crud.get_db)):
    user = crud.read_user_by_username(username=username, db=db)
    if not user:
        raise HTTPException(status_code=404, detail='User does not exist')
    return user


@router.get('/users', response_model=list[schemas.User])
def read_users(db: Session = Depends(crud.get_db)):
    return crud.read_users(db=db)


@router.post('/users', response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(crud.get_db)):
    db_user = crud.read_user_by_username(username=user.username, db=db)
    if db_user:
        raise HTTPException(status_code=400, detail='Username taken')
    db_user = crud.read_user_by_email(email=user.email, db=db)
    if db_user:
        raise HTTPException(status_code=400, detail='Email already registered')
    return crud.create_user(user=user, pwd_context=crud.pwd_context, db=db)


@router.get('/messages/{message_id}', response_model=schemas.Message)
def read_message(message_id: int, db: Session = Depends(crud.get_db)):
    msg = crud.read_message(msg_id=message_id, db=db)
    if not msg:
        raise HTTPException(status_code=404, detail='Message does not exist')
    return msg


@router.put('/messages/{message_id}', response_model=schemas.Message)
def update_message(message_id: int, msg_new: schemas.MessageCreate,
                   db: Session = Depends(crud.get_db)):
    msg = crud.read_message(msg_id=message_id, db=db)
    if not msg:
        raise HTTPException(status_code=404, detail='Message does not exist')
    return crud.update_message(msg=msg, msg_new=msg_new, db=db)


@router.delete('/messages/{message_id}', response_model=schemas.Message)
def delete_message(message_id: int, db: Session = Depends(crud.get_db)):
    msg = crud.read_message(msg_id=message_id, db=db)
    if not msg:
        raise HTTPException(status_code=404, detail='Message does not exist')
    return crud.delete_message(msg=msg, db=db)


@router.get('/messages', response_model=list[schemas.Message])
def read_messages(db: Session = Depends(crud.get_db)):
    return crud.read_messages(db=db)


@router.post('/messages', response_model=schemas.Message)
def create_message(message: schemas.MessageCreate,
                   db: Session = Depends(crud.get_db)):
    msg = crud.create_message(message=message, db=db)
    if not msg:
        raise HTTPException(status_code=400, detail='Error creating message')
    return msg


@router.post('/token')
def login(form_data: OAuth2PasswordRequestForm = Depends(),
          db: Session = Depends(crud.get_db)):
    user = crud.read_user_by_username(username=form_data.username, db=db)
    user = crud.authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid authentication credentials',
            headers={'WWW-Authenticate': 'Bearer'}
        )
    access_token = crud.create_access_token({'sub': user.username})

    return {'access_token': access_token, 'token_type': 'bearer'}
