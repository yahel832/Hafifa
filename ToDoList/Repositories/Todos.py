from sqlalchemy.orm import Session
from DataBase.Models.Todo import Todo
from Schemas.Todo import TodoBase


def get_all(db: Session):
    todos = db.query(Todo).all()
    return todos

def create(request: TodoBase, db: Session):
    new_todo = Todo(todo_name=request.todo_name, description=request.description, user_id=request.user_id,
                    completed=False)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

def get_by_id(todo_id: int, db: Session):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    return todo

def update(todo_id: int, request: TodoBase, db: Session):
    updated_todo = db.query(Todo).filter(Todo.id == todo_id).first()

    updated_todo.todo_name = request.todo_name
    updated_todo.description = request.description
    updated_todo.user_id = request.user_id
    updated_todo.completed = request.completed

    db.add(updated_todo)
    db.commit()
    db.refresh(updated_todo)
    return updated_todo