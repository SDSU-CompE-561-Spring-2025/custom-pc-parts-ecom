from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time
import logging

from app.routers import components


# from . import models, database
# from .routers import components, users

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s = %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

from app.database import engine
from app import models

models.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="PCBuilder",
    description="api for pcbuilder",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Request Logging Middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()

    # Log Request Details
    logger.info(f"Request start: {request.method} {request.url.path}")

    # Process the request
    response = await call_next(request)

    #Calculate and log processing time
    process_time = time.time() - start_time
    logger.info(f"Request end: {request.method} {request.url.path} - {response.status_code} - Took {process_time:.4f}s")

    return response

# app.include_router(components.router, prefix = "/api/v1")
# app.include_router(users.router, prefix="/api/v1")

app.include_router(components.router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "Hello PCBuilder"}