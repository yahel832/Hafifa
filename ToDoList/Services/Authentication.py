from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from Exceptions.InvalidCredentialsException import InvalidCredentialsException
from Repositories import Authentication
from Schemas.Authentication import Token
from Utils.JWTtoken import create_access_token
from Utils.auth import verify_password
from Utils.logger import logger


def login(request: OAuth2PasswordRequestForm, db: Session) -> Token:
    user = Authentication.login(request, db)
    if not user:
        logger.error("User with username: %s not found", user.username)
        raise InvalidCredentialsException
    if not verify_password(request.password, user.password):
        logger.error("Incorrect password")
        raise InvalidCredentialsException
    access_token = create_access_token(data={"sub": user.username})
    return Token(access_token=access_token, token_type="bearer")