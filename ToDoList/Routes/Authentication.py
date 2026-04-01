from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from Schemas.Authentication import Token
from Services import Authentication
from DataBase.Connector import get_db

authentication_router = APIRouter(
    tags=["Authentication"]
)

@authentication_router.post("/login", status_code=status.HTTP_200_OK)
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return Authentication.login(request, db)


