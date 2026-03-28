from typing import Optional

from pydantic import BaseModel

class TodoBase(BaseModel):
    todo_name: str
    description: str
    user_id: int

class TodoUpdate(BaseModel):
    todo_name: Optional[str] = None
    description: Optional[str] = None
    user_id: Optional[int] = None
    completed: Optional[bool] = None
