from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    email: str
    password: str

class ShowUser(BaseModel):
    username: str
    email: str

    class Config:
        orm_mode = True

