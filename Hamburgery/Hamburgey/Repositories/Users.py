from DataBase.Connector import mongo_db
from Exceptions.UserNotFoundException import UserNotFoundException
from Schemas.User import CreateUser
from Utils.auth import get_password_hash
from Utils.logger import logger


async def create(request: CreateUser):
    hashed_password = get_password_hash(request.password)
    request.password = hashed_password
    new_user = request.model_dump()
    await mongo_db.users.insert_one(new_user)
    new_user["_id"] = str(new_user["_id"])
    return new_user

async def update(product_id: str, username: str):
    stored_user = await mongo_db.users.find_one({"username": username})
    if not stored_user:
        logger.error(f"User: {username} not found")
        raise UserNotFoundException(username)

    stored_user["product_vote_id"] = product_id

    await mongo_db.users.update_one({"username": username}, {"$set": stored_user})
    return stored_user

async def get_curr_product_id(username: str):
    user = await mongo_db.users.find_one({"username": username})
    if not user:
        logger.error(f"User with username: {username} not found")
        raise UserNotFoundException(username)
    return user["product_vote_id"]