from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from DataBase.Connector import get_db
from DataBase.Models.Todo import Todo
from Schemas.Todo import TodoBase
from Repositories import Todos

todo_router = APIRouter(
    tags=["Todos"],
    prefix="/todos"
)

@todo_router.get("/")
def get_all(db: Session = Depends(get_db)):
    return Todos.get_all(db)

@todo_router.post("/")
def create(request: TodoBase, db: Session = Depends(get_db)):
    return Todos.create(request, db)

@todo_router.get("/{todo_id}")
def get_by_id(todo_id: int, db: Session = Depends(get_db)):
    return Todos.get_by_id(todo_id, db)

@todo_router.put("/{todo_id}")
def update(todo_id: int,request: TodoBase, db: Session = Depends(get_db)):
    return Todos.update(todo_id, request, db)