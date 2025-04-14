from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/components", tags=["components"])

@router.get("/", response_model=schemas.PaginatedResponse[schemas.Component])
def get_components(
    db: Session = Depends(get_db),
    category: Optional[str] = Query(None),
    brand: Optional[str] = Query(None),
    price_min: Optional[float] = Query(None),
    price_max: Optional[float] = Query(None),
    in_stock: Optional[bool] = Query(None),
    page: int = 1,
    per_page: int = 20,
):
    skip = (page - 1) * per_page
    items = crud.get_components(
        db=db,
        skip=skip,
        limit=per_page,
        category=category,
        brand=brand,
        min_price=price_min,
        max_price=price_max,
        in_stock=in_stock,
    )
    total = len(items)  # In production, you'd use `.count()` for large datasets
    return schemas.PaginatedResponse(
        items=items,
        total=total,
        page=page,
        per_page=per_page
    )

@router.post("/", response_model=schemas.ComponentResponse, status_code=status.HTTP_201_CREATED)
def create_component(
    component: schemas.ComponentCreate,
    db: Session = Depends(get_db),
):
    new_component = crud.create_component(db, component)
    return {"success": True, "component": new_component}


@router.get("/{component_id}", response_model=schemas.Component)
def get_component_by_id(
    component_id: int,
    db: Session = Depends(get_db),
):
    return crud.get_component(db, component_id)



@router.put("/{component_id}", response_model=schemas.ComponentResponse)
def update_component(
    component_id: int,
    component: schemas.ComponentCreate,
    db: Session = Depends(get_db),
):
    updated_component = crud.update_component(db, component_id, component)
    return {"success": True, "component": updated_component}


# @router.delete("/{component_id}", status_code=200)
# def delete_component(component_id: int, db: Session = Depends(get_db)):
#     return crud.delete_component(db, component_id)