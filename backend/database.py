import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{os.environ['POSTGRES_USER']}"
    f":{os.environ['POSTGRES_PASSWORD']}@open-when-db"
    f"/{os.environ['POSTGRES_DB']}"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_size=32, max_overflow=64)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
