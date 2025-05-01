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

@router.delete("/{build_id}", status_code=200)
def delete_build(
    build_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    build = crud.get_build(db, build_id)

    if build.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete this build"
        )

    return crud.delete_build(db, build_id)

@router.get("/{build_id}", response_model=schemas.Build)
def get_user_build_by_id(
    build_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    build = crud.get_build(db, build_id)

    if build.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this build"
        )

    return build