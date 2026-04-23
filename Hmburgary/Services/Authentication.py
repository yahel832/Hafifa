from fastapi import HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from Exceptions.InvalidCredentialsException import InvalidCredentialsException
from Repositories import Authentication
from Schemas.Authentication import Token
from Utils.JWTtoken import create_access_token
from Utils.auth import verify_password
from Utils.logger import logger


async def login(request: OAuth2PasswordRequestForm):
    user = await Authentication.login(request)
    if not user:
        logger.error(f"User with username {request.username} not found")
        raise HTTPException(status_code=InvalidCredentialsException().status, detail=InvalidCredentialsException().detail)
    if not verify_password(request.password, user["password"]):
        logger.error("Incorrect password")
        raise HTTPException(status_code=InvalidCredentialsException().status, detail=InvalidCredentialsException().detail)
    access_token = create_access_token(data={"sub": user["username"]})
    return Token(access_token=access_token, token_type="bearer")