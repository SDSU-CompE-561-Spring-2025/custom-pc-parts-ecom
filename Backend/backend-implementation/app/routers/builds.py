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


# read all components inside of a specific build
@router.get("/{build_id}/components", response_model=List[schemas.BuildComponent])
def get_components_in_build(
    build_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    build = crud.get_build(db, build_id)

    if build.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this build")

    return crud.get_build_components(db, build_id)


# add a component to a build
@router.post("/{build_id}/components", response_model=schemas.BuildComponentResponse)
def add_component_to_build(
    build_id: int,
    component_data: schemas.BuildComponentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    # Make sure user owns the build
    build = crud.get_build(db, build_id)
    if build.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to modify this build")

    build_component = crud.add_component_to_build(
        db,
        build_id=build_id,
        component_id=component_data.component_id,
        quantity=component_data.quantity
    )
    return {"success": True, "build_component": build_component}



# delete a component inside a build
@router.delete("/{build_id}/components/by-component-id/{component_id}")
def remove_component_by_component_id(
    build_id: int,
    component_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    # Make sure user owns the build
    build = crud.get_build(db, build_id)
    if build.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to modify this build")

    # Find the build_component ID
    build_component = db.query(models.BuildComponent).filter_by(
        build_id=build_id,
        component_id=component_id
    ).first()

    if not build_component:
        raise HTTPException(status_code=404, detail="Component not found in this build")

    return crud.remove_component_from_build(db, build_component.id)



