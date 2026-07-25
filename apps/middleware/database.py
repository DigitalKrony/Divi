import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

PG_DB_USER = os.getenv('PG_DB_USER', 'divvy_admin')
PG_DB_PASS = os.getenv('PG_DB_PASS', 'password')
PG_DB_HOST = os.getenv('PG_DB_HOST', 'localhost')
PG_DB_PORT = os.getenv('PG_DB_PORT', '5432')
PG_DB = os.getenv('PG_DB', 'divvy_db')

SQLALCHEMY_DATABASE_URL = (
  f'postgresql://{PG_DB_USER}:{PG_DB_PASS}@{PG_DB_HOST}:{PG_DB_PORT}/{PG_DB}'
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()
