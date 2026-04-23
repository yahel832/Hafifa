from DataBase.Connector import mongo_db
from Schemas.User import CreateUser
from Utils.auth import get_password_hash


async def create(request: CreateUser):
    hashed_password = get_password_hash(request.password)
    request.password = hashed_password
    new_user = request.model_dump()
    await mongo_db.users.insert_one(new_user)
    new_user["_id"] = str(new_user["_id"])
    return new_user