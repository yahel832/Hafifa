from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from Services import Authentication

authentication_router = APIRouter(
    tags=["Authentication"]
)

@authentication_router.post("/login", status_code=status.HTTP_200_OK)
async def login(request: OAuth2PasswordRequestForm = Depends()):
    return await Authentication.login(request)


