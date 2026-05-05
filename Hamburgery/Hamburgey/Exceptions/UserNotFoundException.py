class UserNotFoundException(Exception):
    def __init__(self, username: str):
        self.detail = f"User: {username} doesn't exist"
        self.status = 404
        super().__init__(self.detail, self.status)