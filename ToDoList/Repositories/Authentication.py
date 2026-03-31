from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from DataBase.Models.User import User
from Schemas.User import UserBase


def login(request: OAuth2PasswordRequestForm, db: Session) -> type[User] | None:
    return db.query(User).filter(User.username == request.username).first()

