from typing import Optional
from fastapi import FastAPI, APIRouter
from routers.message import router as MessageRouter


app = FastAPI(root_path='/api')
app.include_router(MessageRouter)


@app.get('/')
def read_root():
    return {"Hello": "World"}
