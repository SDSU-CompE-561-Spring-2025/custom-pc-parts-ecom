from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional

from app.database import get_db  # Make sure this path matches your project structure
from app.models import Review    # Make sure this path matches your project structure
from app.schemas import Review as ReviewSchema  # Import the Review schema

router = APIRouter(
    prefix="/api/v1/reviews",
    tags=["Reviews"]
)

@router.get("/random/", response_model=List[ReviewSchema])
def get_random_reviews(
    component_id: Optional[int] = Query(None),
    limit: int = Query(6, ge=1, le=30),
    status: str = Query("approved"),
    db: Session = Depends(get_db)
):
    """
    Get random reviews, optionally filtered by component_id.
    If component_id is None, returns general reviews (with null component_id).
    """
    # Create the query
    query = db.query(Review)
    
    # Apply filters
    if status:
        query = query.filter(Review.status == status)
    
    if component_id is not None:
        # If component_id is provided, get reviews for that component
        query = query.filter(Review.component_id == component_id)
    else:
        # If no component_id, get general reviews (with null component_id)
        query = query.filter(Review.component_id.is_(None))
    
    # Get the total count of applicable reviews
    total_reviews = query.count()
    
    # If we have more reviews than the limit, get random ones
    if total_reviews > limit:
        # Order by random and limit to requested number
        reviews = query.order_by(func.random()).limit(limit).all()
    else:
        # If we have fewer reviews than the limit, return all of them
        reviews = query.all()
    