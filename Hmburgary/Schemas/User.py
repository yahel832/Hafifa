from typing import Optional

from pydantic import BaseModel, Field


class CreateUser(BaseModel):
    username: str = Field(None)
    password: str = Field(None)
    product_vote_id: Optional[str] = Field(None)

class ShowUser(BaseModel):
    username: str = Field(None)
    product_vote_id: Optional[str] = Field(None)