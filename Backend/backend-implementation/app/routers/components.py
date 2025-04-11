from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from .. import crud, models, schemas

router = APIRouter(
    prefix="/components",
    tags=["components"]
)

@router.post("/", response_model=schemas.ComponentResponse, status_code=status.HTTP_201_CREATED)

def create_component(component: schemas.ComponentCreate, db: Session = Depends(crud.get_db)):
    db_component = crud.create_component(db = db, component = component)
    return {"success": True, "component": db_component}

