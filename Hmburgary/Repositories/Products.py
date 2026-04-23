from datetime import datetime
from typing import Optional

from bson import ObjectId
from fastapi import status
from fastapi.responses import Response

from Exceptions.ProductNotFoundException import ProductNotFoundException

from DataBase.Connector import mongo_db

from Schemas.Products import ProductCollection, ProductUpdate, ProductCreate, ProductInDB
from Utils.logger import logger


async def get_all(by_vote: Optional[bool] = None, weekday: Optional[str] = None):
    if by_vote is not None:
        if by_vote:
            order = 1
        else:
            order = -1
        pipeline = [
            {
                "$group": {
                    "_id": "$product_vote_id",
                    "voteCount": {"$sum": 1}
                }
            },
            {
                "$addFields": {
                    "productObjectId": {"$toObjectId": "$_id"}
                }
            },
            {
                "$lookup": {
                    "from": "products",
                    "localField": "productObjectId",
                    "foreignField": "_id",
                    "as": "product"
                }
            },
            {"$unwind": "$product"},
            {"$sort": {"voteCount": order}},
            {
                "$replaceRoot": {
                    "newRoot": {
                        "$mergeObjects": ["$product", {"voteCount": "$voteCount"}]
                    }
                }
            }
        ]

        products = await mongo_db.users.aggregate(pipeline).to_list(length=None)

        for r in products:
            r["_id"] = str(r["_id"])

        return products
    if weekday is not None:
        return ProductCollection(products=await mongo_db.products.find({ "weekday": weekday }).to_list(length=None))

    return ProductCollection(products= await mongo_db.products.find().to_list(length=None))

async def create(product: ProductCreate):
    new_product = product.model_dump()

    new_product["launch_date"] = datetime.now()
    new_product["last_updated"] = datetime.now()

    await mongo_db.products.insert_one(new_product)
    new_product["_id"] = str(new_product["_id"])

    return new_product


async def get_by_id(id: str):
    product = await mongo_db.products.find_one({"_id": ObjectId(id)})
    if not product:
        logger.error(f"Product with id: {id} not found")
        raise ProductNotFoundException(id)
    product["_id"] = str(product["_id"])
    return product

async def update(id: str, request: ProductUpdate):
    stored_product = await mongo_db.products.find_one({"_id": ObjectId(id)})
    if not stored_product:
        logger.error(f"Product with id: {id} not found")
        raise ProductNotFoundException(id)

    update_data = request.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        stored_product[key] = value

    stored_product["last_updated"] = datetime.now()

    await mongo_db.products.update_one({"_id": ObjectId(id)}, {"$set": stored_product})
    return stored_product

async def delete(id: str):
    delete_result = await mongo_db.products.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    logger.error(f"Product with id: {id} not found")
    raise ProductNotFoundException(id)

