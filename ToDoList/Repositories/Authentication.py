from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from DataBase.Models.User import User


def login(request: OAuth2PasswordRequestForm, db: Session):
    return db.query(User).filter(User.username == request.username).first()

