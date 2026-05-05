from fastapi import APIRouter, status, Depends

from Schemas.Authentication import TokenData
from Schemas.User import ShowUser, CreateUser
from Services import Users
from Utils.oauth2 import get_current_user

user_router = APIRouter(
    tags=["Users"],
    prefix="/users"
)

@user_router.post("/", response_model=ShowUser, status_code=status.HTTP_201_CREATED)
async def create(request: CreateUser):
    return await Users.create(request)

@user_router.patch("/", status_code=status.HTTP_200_OK, response_model=ShowUser)
async def update(product_id: str, current_user: TokenData = Depends(get_current_user)):
    return await Users.update(product_id, current_user.username)

@user_router.get("/curr_vote", status_code=status.HTTP_200_OK)
async def get_curr_product_id(current_user: TokenData = Depends(get_current_user)):
    return await Users.get_curr_product_id(current_user.username)
