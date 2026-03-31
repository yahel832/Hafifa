from fastapi import HTTPException, status


class TodoNotFoundException(HTTPException):
    def __init__(self, todo_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id: {todo_id} doesn't exist"
        )