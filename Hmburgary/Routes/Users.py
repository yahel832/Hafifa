from fastapi import APIRouter, status
from Schemas.User import ShowUser, CreateUser
from Services import Users

user_router = APIRouter(
    tags=["Users"],
    prefix="/users"
)

@user_router.post("/", response_model=ShowUser, status_code=status.HTTP_201_CREATED)
async def create(request: CreateUser):
    return await Users.create(request)
