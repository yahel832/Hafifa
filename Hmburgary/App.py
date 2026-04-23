from fastapi import FastAPI
from Routes.Authentication import authentication_router
from Routes.Products import product_router
from Routes.Users import user_router

app = FastAPI()

app.include_router(authentication_router)
app.include_router(product_router)
app.include_router(user_router)
