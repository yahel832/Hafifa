class ProductNotFoundException(Exception):
    def __init__(self, todo_id: str):
        self.detail = f"Product with id: {todo_id} doesn't exist"
        self.status = 404
        super().__init__(self.detail, self.status)