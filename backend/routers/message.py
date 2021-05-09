from fastapi import APIRouter
from models.message import Message


router = APIRouter(prefix='/messages')


@router.get('/{message_id}')
def read_message(message_id: int, q: str = None):
    return {'message_id': message_id, 'q': q}


@router.post('/')
def create_message(message: Message):
    return message
