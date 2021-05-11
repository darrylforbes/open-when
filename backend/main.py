from typing import Optional
from fastapi import FastAPI
from database import engine
from models import Base
from routes import router


# app = FastAPI(root_path='/api')
app = FastAPI()
app.include_router(router)
