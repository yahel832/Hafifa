from sqlalchemy import Column, Integer, String
from DataBase.Connector import Base


class User(Base):
    __tablename__ = 'user'
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)