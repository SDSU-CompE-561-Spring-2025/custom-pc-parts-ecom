from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time
import logging

# Use relative imports
from .routers import components, users, builds, reviews
from .database import engine
from . import models

# Create tables
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="PCBuilder",
    description="API for PCBuilder",
    version="1.0.0"
)

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    logger = logging.getLogger("uvicorn.access")
    logger.info(f"Request start: {request.method} {request.url.path}")
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Request end: {request.method} {request.url.path} - {response.status_code} - {duration:.4f}s")
    return response

# Include routers
app.include_router(components.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(builds.router, prefix="/api/v1")
app.include_router(reviews.router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "Hello PCBuilder"}