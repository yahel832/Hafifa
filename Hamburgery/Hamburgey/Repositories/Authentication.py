from fastapi.security import OAuth2PasswordRequestForm
from DataBase.Connector import mongo_db


async def login(request: OAuth2PasswordRequestForm):
    return await mongo_db.users.find_one({"username": request.username})

