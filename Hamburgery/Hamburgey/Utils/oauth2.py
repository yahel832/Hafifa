from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from Exceptions.InvalidCredentialsException import InvalidCredentialsException
from Schemas.Authentication import TokenData
from Utils.JWTtoken import verify_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_current_user(token: str = Depends(oauth2_scheme)) -> TokenData:
    try:
        return verify_token(token)
    except InvalidCredentialsException as e:
        raise HTTPException(status_code=e.status, detail=e.detail)
