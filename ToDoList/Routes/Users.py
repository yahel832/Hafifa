from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from DataBase.Connector import get_db
from Schemas.User import UserBase
from Repositories import Users

user_router = APIRouter(
    tags=["Users"],
    prefix="/users"
)

@user_router.post("/")
def create(request: UserBase, db: Session = Depends(get_db)):
    return Users.create(request, db)