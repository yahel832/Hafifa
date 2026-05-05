class InvalidFormatException(Exception):
    def __init__(self):
        self.detail = "Your current request format is bad. Correct it and try again"
        self.status = 422
        super().__init__(self.detail, self.status)