from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from DataBase.Connector import get_db
from DataBase.Models.Todo import Todo
from Schemas.Todo import TodoBase, TodoUpdate
from Repositories import Todos

todo_router = APIRouter(
    tags=["Todos"],
    prefix="/todos"
)

@todo_router.get("/")
def get_all(db: Session = Depends(get_db), limit: Optional[int] = None, completed: Optional[bool] = None, user_id: Optional[int] = None):
    return Todos.get_all(db, limit, completed, user_id)

@todo_router.post("/")
def create(request: TodoBase, db: Session = Depends(get_db)):
    return Todos.create(request, db)

@todo_router.get("/{todo_id}")
def get_by_id(todo_id: int, db: Session = Depends(get_db)):
    return Todos.get_by_id(todo_id, db)

@todo_router.put("/{todo_id}")
def update(todo_id: int, request: TodoUpdate, db: Session = Depends(get_db)):
    return Todos.update(todo_id, request, db)

@todo_router.delete("/{todo_id}")
def delete(todo_id: int, db: Session = Depends(get_db)):
    return Todos.delete(todo_id, db)

@todo_router.patch("/complete/{todo_id}")
def complete(todo_id: int, db: Session = Depends(get_db)):
    return Todos.complete(todo_id, db)