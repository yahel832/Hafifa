from fastapi import FastAPI
from DataBase.Models.Todo import Todo
from DataBase.Models.User import User
from DataBase.Connector import engine, Base
from Routes.Todos import todo_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(todo_router)