import pytest
from sqlalchemy import StaticPool, create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from App import app
from DataBase.Connector import get_db, Base
from DataBase.Models.Todo import Todo
from DataBase.Models.User import User

DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(DATABASE_URL,
                       connect_args={"check_same_thread": False},
                       poolclass=StaticPool)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

client = TestClient(app)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="session")
def session():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    db_session = TestingSessionLocal()
    db_session.add(User(username="exist", password="exist", email="exist"))
    db_session.add(Todo(todo_id=10, todo_name="test" ,description="This is a test", completed=True, creator_username="exist"))
    db_session.commit()
    yield db_session

    db_session.close()
    Base.metadata.drop_all(engine)