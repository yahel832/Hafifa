from typing import Optional

from sqlalchemy.orm import Session
from fastapi import status
from starlette.responses import Response

from DataBase.Models.Todo import Todo
from Schemas.Todo import TodoBase, TodoUpdate


def get_all(db: Session, limit: Optional[int] = None, completed: Optional[bool] = None, user_id: Optional[int] = None):
    todos = db.query(Todo)

    if limit is not None:
        todos = todos.limit(limit)

    if completed is not None:
        todos = todos.filter(Todo.completed == completed)

    if user_id is not None:
        todos = todos.filter(Todo.user_id == user_id)

    return todos.all()

def create(request: TodoBase, db: Session):
    new_todo = Todo(todo_name=request.todo_name, description=request.description, user_id=request.user_id,
                    completed=False)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

def get_by_id(todo_id: int, db: Session):
    todo = db.query(Todo).filter(Todo.todo_id == todo_id).first()
    return todo

def update(todo_id: int, request: TodoUpdate, db: Session):
    stored_todo = db.query(Todo).filter(Todo.todo_id == todo_id).first()
    update_data = request.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(stored_todo, key, value)

    db.add(stored_todo)
    db.commit()
    db.refresh(stored_todo)
    return stored_todo

def delete(todo_id: int, db: Session):
    todo = db.query(Todo).filter(Todo.todo_id == todo_id).first()

    db.delete(todo)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)

def complete(todo_id: int, db: Session):
    todo = db.query(Todo).filter(Todo.todo_id == todo_id).first()
    todo.completed = True

    db.add(todo)
    db.commit()
    db.refresh(todo)

    return todo

