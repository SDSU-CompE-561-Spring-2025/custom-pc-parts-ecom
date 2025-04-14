# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session

# from app import crud, models, schemas
# from app.database import get_db
# from app.auth import get_current_active_user

# router = APIRouter(prefix="/builds", tags=["builds"])

# @router.get("/", response_model=schemas.PaginatedResponse[schemas.Build])
# def get_user_builds(
#     db: Session = Depends(get_db),
#     current_user: models.User = Depends(get_current_active_user),
#     page: int = 1,
#     per_page: int = 20,
# ):
#     skip = (page - 1) * per_page
#     builds = crud.get_builds(db, user_id=current_user.id, skip=skip, limit=per_page)
#     return schemas.PaginatedResponse(
#         items=builds,
#         total=len(builds),
#         page=page,
#         per_page=per_page,
#     )

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app import crud, models, schemas
from app.database import get_db
from app.auth import get_current_active_user

router = APIRouter(prefix="/builds",tags=["builds"])


@router.get("/", response_model=List[schemas.Build])
def read_user_builds(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
    skip: int = 0,
    limit: int = 20,
):
    return crud.get_builds(db, user_id=current_user.id, skip=skip, limit=limit)

@router.post("/", response_model=schemas.Build)
def create_new_build(
    build: schemas.BuildCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    return crud.create_build(db, build, user_id=current_user.id)