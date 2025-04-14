from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time
import logging

from app.routers import components, users, builds

#imports the database engine and models to initialize the tables
from app.database import engine
from app import models

#creates the database tables
models.Base.metadata.create_all(bind=engine)

#initializes FastAPI
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
#middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    logger = logging.getLogger("uvicorn.access")
    logger.info(f"Request start: {request.method} {request.url.path}")
    response = await call_next(request)
    #tracks response time
    duration = time.time() - start_time
    logger.info(f"Request end: {request.method} {request.url.path} - {response.status_code} - {duration:.4f}s")
    return response

# Include routers
app.include_router(components.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(builds.router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "Hello PCBuilder"}