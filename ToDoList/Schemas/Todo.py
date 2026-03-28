from pydantic import BaseModel

class TodoBase(BaseModel):
    todo_name: str
    description: str
    user_id: int
    completed: bool
