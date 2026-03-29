from DataBase.Models.User import User
from Schemas.User import UserBase
from sqlalchemy.orm import Session

def create(request: UserBase, db: Session):
    new_user = User(username=request.username, email=request.email, password=request.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user