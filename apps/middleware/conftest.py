from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import pytest

from main import app
from database import Base, get_db

SQLALCHEMY_DATABASE_URL = 'sqlite:///:memory:'

engine = create_engine(
  SQLALCHEMY_DATABASE_URL,
  connect_args={'check_same_thread': False},
  poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
  try:
    db = TestingSessionLocal()
    yield db
  finally:
    db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope='function')
def client():
  Base.metadata.create_all(bind=engine)

  with TestClient(app) as c:
    yield c

  Base.metadata.drop_all(bind=engine)
