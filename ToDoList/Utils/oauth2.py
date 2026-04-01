from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from Schemas.Authentication import TokenData
from Utils.JWTtoken import verify_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_current_user(token: str = Depends(oauth2_scheme)) -> TokenData:
    return verify_token(token)
