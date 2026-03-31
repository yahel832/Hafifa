from typing import Optional, List
from sqlalchemy.orm import Session
from fastapi import Response
from DataBase.Models.Todo import Todo
from Exceptions.TodoNotFoundException import TodoNotFoundException
from Repositories import Todos
from Schemas.Authentication import TokenData
from Schemas.Todo import CreateTodo, TodoUpdate
from Utils.logger import logger


def get_all(db: Session, limit: Optional[int] = None, completed: Optional[bool] = None, username: Optional[str] = None) -> List[type[Todo]]:
    return Todos.get_all(db, limit, completed, username)

def create(request: CreateTodo, db: Session, current_user: TokenData) -> Todo:
    return Todos.create(request, db, current_user)

def get_by_id(todo_id: int, db: Session) -> type[Todo]:
    todo = Todos.get_by_id(todo_id, db)
    if not todo:
        logger.error("todo with id %d not found", todo_id)
        raise TodoNotFoundException(todo_id)
    return todo

def update(todo_id: int, request: TodoUpdate, db: Session) -> type[Todo]:
    return Todos.update(todo_id, request, db)

def delete(todo_id: int, db: Session) -> Response:
    return Todos.delete(todo_id, db)

def complete(todo_id: int, db: Session) -> type[Todo]:
    return Todos.complete(todo_id, db)

def get_current_user_todos(db: Session, current_user: TokenData) -> List[type[Todo]]:
    return Todos.get_all(db, username=current_user.username)
