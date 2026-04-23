from typing import Optional

from fastapi import APIRouter, status, Depends
from Schemas.Authentication import TokenData
from Schemas.Products import ProductCreate, ProductUpdate
from Services import Products
from Utils.oauth2 import get_current_user

product_router = APIRouter(
    tags=["Products"],
    prefix="/products"
)

@product_router.get("/", status_code=status.HTTP_200_OK)
async def get_all(by_vote: Optional[bool] = None, weekday: Optional[str] = None, current_user: TokenData = Depends(get_current_user)):
    return await Products.get_all(by_vote, weekday)

@product_router.post("/", status_code=status.HTTP_201_CREATED, response_model=ProductCreate)
async def create(request: ProductCreate, current_user: TokenData = Depends(get_current_user)):
    return await Products.create(request)

@product_router.get("/{id}", status_code=status.HTTP_200_OK, response_model=ProductCreate)
async def get_by_id(id: str, current_user: TokenData = Depends(get_current_user)):
    return await Products.get_by_id(id)

@product_router.put("/{id}", status_code=status.HTTP_200_OK, response_model=ProductCreate)
async def update(id: str, request: ProductUpdate, current_user: TokenData = Depends(get_current_user)):
    return await Products.update(id, request)

@product_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete(id: str, current_user: TokenData = Depends(get_current_user)):
    return await Products.delete(id)