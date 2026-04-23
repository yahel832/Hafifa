from envyaml import EnvYAML
from motor.motor_asyncio import AsyncIOMotorClient

config = EnvYAML('Config/config.yaml')

client = AsyncIOMotorClient(config['mongodb.url'])
mongo_db = client[config['mongodb.name']]
product_collection = mongo_db["products"]