from DataBase.Models.User import User
from Schemas.Authentication import Token
from Schemas.User import UserBase
from sqlalchemy.orm import Session
from Utils.JWTtoken import create_access_token
from Utils.auth import get_password_hash
from Utils.logger import logger


def create(request: UserBase, db: Session) -> User:
    hashed_password = get_password_hash(request.password)
    new_user = User(username=request.username, email=request.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    logger.info(f"New user with username {request.username} created")
    return new_user



def create_new_token(username: str) -> Token:
    access_token = create_access_token(data={"sub": username})
    return Token(access_token=access_token, token_type="bearer")