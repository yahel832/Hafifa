from typing import Optional, List
from fastapi import APIRouter, Depends, status, Response
from sqlalchemy.orm import Session
from DataBase.Connector import get_db
from DataBase.Models.Todo import Todo
from Schemas.Authentication import TokenData
from Schemas.Todo import TodoUpdate, CreateTodo
from Services import Todos
from Utils.logger import logger
from Utils.oauth2 import get_current_user

todo_router = APIRouter(
    tags=["Todos"],
    prefix="/todos"
)

@todo_router.get("/", status_code=status.HTTP_200_OK)
def get_all(db: Session = Depends(get_db),
            current_user: TokenData = Depends(get_current_user),
            limit: Optional[int] = None,
            completed: Optional[bool] = None,
            username: Optional[str] = None) -> List[type[Todos]]:
    return Todos.get_all(db, limit, completed, username)

@todo_router.post("/", status_code=status.HTTP_201_CREATED)
def create(request: CreateTodo, db: Session = Depends(get_db), current_user: TokenData = Depends(get_current_user)) -> Todo:
    logger.info("Can anybody hear me")
    return Todos.create(request, db, current_user)

@todo_router.get("/current", status_code=status.HTTP_200_OK)
def get_current_user_todos(db: Session = Depends(get_db), current_user: TokenData = Depends(get_current_user)) -> List[type[Todos]]:
    return Todos.get_current_user_todos(db, current_user)

@todo_router.get("/{todo_id}", status_code=status.HTTP_200_OK)
def get_by_id(todo_id: int, db: Session = Depends(get_db), current_user: TokenData = Depends(get_current_user)) -> type[Todo]:
    return Todos.get_by_id(todo_id, db)

@todo_router.put("/{todo_id}", status_code=status.HTTP_200_OK)
def update(todo_id: int, request: TodoUpdate, db: Session = Depends(get_db), current_user: TokenData = Depends(get_current_user)) -> type[Todo]:
    return Todos.update(todo_id, request, db)

@todo_router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(todo_id: int, db: Session = Depends(get_db), current_user: TokenData = Depends(get_current_user)) -> Response:
    return Todos.delete(todo_id, db)

@todo_router.patch("/complete/{todo_id}", status_code=status.HTTP_202_ACCEPTED)
def complete(todo_id: int, db: Session = Depends(get_db), current_user: TokenData = Depends(get_current_user)) -> type[Todo]:
    return Todos.complete(todo_id, db)