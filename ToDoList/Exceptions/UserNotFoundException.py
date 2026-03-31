from fastapi import HTTPException, status


class UserNotFoundException(HTTPException):
    def __init__(self, username: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User: {username} doesn't exist"
        )