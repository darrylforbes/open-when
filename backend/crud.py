from sqlalchemy.orm import Session
import models, schemas


def read_user(user_id: int, db: Session):
    return db.query(models.User).filter(models.User.id == user_id).first()


def read_all_users(db: Session):
    return db.query(models.User).all()


def read_user_by_email(email: str, db: Session):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(user: schemas.UserCreate, db: Session):
    # TODO: implement password hashing
    hashed_password = user.password + 'hash'
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def read_message(msg_id: int, db: Session):
    return db.query(models.Message).filter(models.Message.id == msg_id).first()


def read_all_messages(db: Session):
    return db.query(models.Message).all()


def create_message(message: schemas.MessageCreate, db: Session):
    db_message = models.Message(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
