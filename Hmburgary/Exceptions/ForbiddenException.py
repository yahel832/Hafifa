class ForbiddenException(Exception):
    def __init__(self):
        self.detail = "Not authorized to perform this action"
        self.status = 403
        super().__init__(self.detail, self.status)