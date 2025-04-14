from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import schemas, crud, models
from app.database import get_db
from app.auth import get_current_active_user

router = APIRouter(
    prefix="/api/v1/reviews",
    tags=["Reviews"]
)

# Create a new review
@router.post("/", response_model=schemas.ReviewResponse)
def create_review(
    review: schemas.ReviewCreate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_active_user),
):
    return crud.create_review(db=db, review=review, user_id=user.id)

# Get reviews 
@router.get("/", response_model=list[schemas.Review])
def read_reviews(db: Session = Depends(get_db)):
    return crud.get_reviews(db)
#delete review
@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(review_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_active_user)):
    crud.delete_review(db=db, review_id=review_id, user_id=user.id)