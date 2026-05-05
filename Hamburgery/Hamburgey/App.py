from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from Routes.Authentication import authentication_router
from Routes.Products import product_router
from Routes.Users import user_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authentication_router)
app.include_router(product_router)
app.include_router(user_router)
