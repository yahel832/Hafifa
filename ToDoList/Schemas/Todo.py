from typing import Optional
from pydantic import BaseModel


class CreateTodo(BaseModel):
    todo_name: str
    description: str

class TodoUpdate(BaseModel):
    todo_name: Optional[str] = None
    description: Optional[str] = None
    creator_username: Optional[str] = None
    completed: Optional[bool] = None
