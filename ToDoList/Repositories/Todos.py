from typing import Optional, List
from sqlalchemy.orm import Session
from fastapi import status
from fastapi.responses import Response

from DataBase.Models.Todo import Todo
from DataBase.Models.User import User
from Exceptions.TodoNotFoundException import TodoNotFoundException
from Exceptions.UserNotFoundException import UserNotFoundException
from Schemas.Authentication import TokenData
from Schemas.Todo import TodoUpdate, CreateTodo
from Utils.logger import logger


def get_all(db: Session, limit: Optional[int] = None, completed: Optional[bool] = None, username: Optional[str] = None) -> List[type[Todo]]:
    todos = db.query(Todo)

    if completed is not None:
        todos = todos.filter(Todo.completed == completed)

    if username is not None:
        todos = todos.filter(Todo.creator_username == username)

    if limit is not None:
        todos = todos.limit(limit)

    logger.info("returning all todos")
    return todos.all()

def create(request: CreateTodo, db: Session, current_user: TokenData) -> Todo:
    new_todo = Todo(todo_name=request.todo_name, description=request.description, creator_username=current_user.username,
                    completed=False)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    logger.info("created new todo with id: %d", new_todo.todo_id)
    return new_todo

def get_by_id(todo_id: int, db: Session) -> type[Todo] | None:
    logger.info("fetching todo with id: %d", todo_id)
    return db.query(Todo).filter(Todo.todo_id == todo_id).first()


def update(todo_id: int, request: TodoUpdate, db: Session) -> type[Todo]:
    stored_todo = db.query(Todo).filter(Todo.todo_id == todo_id).first()
    if not stored_todo:
        logger.error("todo with id: %d does not exist", todo_id)
        raise TodoNotFoundException(todo_id)

    user = db.query(User).filter(User.username == request.creator_username).first()
    if not user:
        logger.error("user with username: %s does not exist", request.creator_username)
        raise UserNotFoundException(request.creator_username)

    update_data = request.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(stored_todo, key, value)

    db.add(stored_todo)
    db.commit()
    db.refresh(stored_todo)

    logger.info("todo with id: %d updated", stored_todo.todo_id)
    return stored_todo

def delete(todo_id: int, db: Session) -> Response:
    todo = db.query(Todo).filter(Todo.todo_id == todo_id).first()
    if not todo:
        logger.error("todo with id: %d does not exist", todo_id)
        raise TodoNotFoundException(todo_id)

    db.delete(todo)
    db.commit()

    logger.info("todo with id: %d deleted", todo_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

def complete(todo_id: int, db: Session) -> type[Todo]:
    todo = db.query(Todo).filter(Todo.todo_id == todo_id).first()
    if not todo:
        logger.error("todo with id: %d does not exist", todo_id)
        raise TodoNotFoundException(todo_id)
    todo.completed = True

    db.add(todo)
    db.commit()
    db.refresh(todo)

    logger.info("todo with id: %d updated to completed", todo_id)
    return todo

def get_current_user_todos(db: Session, current_user: TokenData) -> List[type[Todo]]:
    return get_all(db, username=current_user.username)

