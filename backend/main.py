from fastapi import FastAPI
from routes import router


app = FastAPI(root_path='/api')
app.include_router(router)
