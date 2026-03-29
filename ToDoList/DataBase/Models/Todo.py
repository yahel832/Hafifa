from DataBase.Connector import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey


class Todo(Base):
    __tablename__ = 'todo'
    todo_id = Column(Integer, primary_key=True, index=True)
    todo_name = Column(String)
    description = Column(String)
    user_id = Column(Integer, ForeignKey('user.user_id'))
    completed = Column(Boolean)
