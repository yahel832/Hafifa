from Repositories import Users
from Schemas.User import CreateUser
from Utils.logger import logger


async def create(request: CreateUser):
    logger.info(f"Creating new user: {request.username}")
    return await Users.create(request)
