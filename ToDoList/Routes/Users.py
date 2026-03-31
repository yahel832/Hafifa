from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from DataBase.Connector import get_db
from DataBase.Models.User import User
from Schemas.Authentication import TokenData, Token
from Schemas.User import UserBase, ShowUser
from Services import Users
from Utils.oauth2 import get_current_user

user_router = APIRouter(
    tags=["Users"],
    prefix="/users"
)

@user_router.post("/", response_model=ShowUser, status_code=status.HTTP_201_CREATED)
def create(request: UserBase, db: Session = Depends(get_db)) -> User:
    return Users.create(request, db)

@user_router.post("/token", status_code=status.HTTP_201_CREATED)
def create_new_token(current_user: TokenData = Depends(get_current_user)) -> Token:
    return Users.create_new_token(current_user.username)