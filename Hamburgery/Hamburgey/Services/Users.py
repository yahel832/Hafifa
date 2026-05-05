from fastapi import HTTPException

from Exceptions.UserNotFoundException import UserNotFoundException
from Repositories import Users
from Schemas.User import CreateUser
from Utils.logger import logger


async def create(request: CreateUser):
    logger.info(f"Creating new user: {request.username}")
    return await Users.create(request)

async def update(product_id: str, username: str):
    try:
        user = await Users.update(product_id, username)
        logger.info(f"user: {username} updated")
        return user
    except UserNotFoundException as e:
        raise HTTPException(status_code=e.status, detail=e.detail)

async def get_curr_product_id(username: str):
    logger.info(f"Fetching current user product vote")
    try:
        return await Users.get_curr_product_id(username)
    except UserNotFoundException as e:
        raise HTTPException(status_code=e.status, detail=e.detail)
