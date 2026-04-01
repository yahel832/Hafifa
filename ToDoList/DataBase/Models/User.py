from sqlalchemy import Column, String
from DataBase.Connector import Base


class User(Base):
    __tablename__ = 'user'
    username = Column(String, primary_key=True)
    email = Column(String)
    password = Column(String)