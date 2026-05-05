from datetime import datetime
from typing import List, Annotated, Optional

from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, Field, ConfigDict

PyObjectId = Annotated[str, BeforeValidator(str)]

class ProductInDB(BaseModel):
    id: PyObjectId = Field(alias="_id", default=None)
    name: str = Field(None)
    description: Optional[str] = Field(None)
    creator: Optional[str] = Field(None)
    weekday: List[str] = Field(None)
    category: str = Field(None)
    launch_date: datetime = Field(None)
    last_updated: datetime = Field(None)
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
    )

class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None)
    description: Optional[str] = Field(None)
    weekday: Optional[List[str]] = Field(None)
    category: Optional[str] = Field(None)
    creator: Optional[str] = Field(None)

class ProductCreate(BaseModel):
    name: str = Field(None)
    description: Optional[str] = Field(None)
    weekday: List[str] = Field(None)
    category: str = Field(None)
    creator: str = Field(None)

class ProductCollection(BaseModel):
    products: List[ProductInDB]

