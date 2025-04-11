from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware

from . import models, database
from .routers import components

app = FastAPI(
    title="PCBuilder",
    description="api for pcbuilder",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(components.router, prefix = "/api/v1")

@app.get("/")
def root():
    return {"message": "Hello PCBuilder"}