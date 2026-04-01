from sqlalchemy import exc
from sqlalchemy.orm import Session
from DataBase.Models.User import User
from Exceptions.UserAlreadyExistsException import UserAlreadyExistsException
from Repositories import Users
from Schemas.Authentication import Token
from Schemas.User import UserBase
from Utils.logger import logger


def create(request: UserBase, db: Session):
    try:
        logger.info(f"Creating new user: {request.username}")
        return Users.create(request, db)
    except exc.IntegrityError:
        logger.error(f"User with username {request.username} already exists")
        raise UserAlreadyExistsException


def create_new_token(username: str):
    logger.info(f"Creating new token for user: {username}")
    return Users.create_new_token(username)