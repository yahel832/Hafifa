from typing import Optional

from fastapi import HTTPException
from Exceptions.ProductNotFoundException import ProductNotFoundException
from Repositories import Products
from Schemas.Products import ProductCreate, ProductUpdate
from Utils.logger import logger


async def get_all(by_vote: Optional[bool] = None, weekday: Optional[str] = None):
    try:
        logger.info("returning all products")
        return await Products.get_all(by_vote, weekday)
    except Exception as e:
        logger.error(f"Failed to fetch products {e}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve products {e}")

async def create(request: ProductCreate):
    product = await Products.create(request)
    logger.info("Product with id: %s created", product["_id"])
    return product

async def get_by_id(id: str):
    logger.info(f"Fetching product with id: {id}")
    try:
        return await Products.get_by_id(id)
    except ProductNotFoundException as e:
        raise HTTPException(status_code=e.status, detail=e.detail)

async def update(id: str, request: ProductUpdate):
    try:
        product = await Products.update(id, request)
        logger.info(f"Product with id: {id} updated")
        return product
    except ProductNotFoundException as e:
        raise HTTPException(status_code=e.status, detail=e.detail)


async def delete(id: str):
    try:
        response = await Products.delete(id)
        logger.info(f"Product with id: {id} deleted")
        return response
    except ProductNotFoundException as e:
        raise HTTPException(status_code=e.status, detail=e.detail)
