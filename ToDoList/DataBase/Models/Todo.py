from DataBase.Connector import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey


class Todo(Base):
    __tablename__ = 'todo'
    todo_id = Column(Integer, primary_key=True, index=True)
    todo_name = Column(String)
    description = Column(String)
    creator_username = Column(String, ForeignKey('user.username'))
    completed = Column(Boolean)
