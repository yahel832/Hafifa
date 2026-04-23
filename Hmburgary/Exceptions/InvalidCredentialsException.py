class InvalidCredentialsException(Exception):
    def __init__(self):
        self.detail = "Invalid Credentials"
        self.status = 401
        super().__init__(self.detail, self.status)