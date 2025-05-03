from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from .. import crud, models, schemas
from ..database import get_db
from ..auth import authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_active_user

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return {"success": True, "user": crud.create_user(db=db, user=user)}

@router.get("/me", response_model=schemas.UserResponse)
async def read_users_me(current_user: models.User = Depends(get_current_active_user)):
    return {"success": True, "user": current_user}

# @router.post("/token", response_model=schemas.TokenResponse)
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = authenticate_user(db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.email}, expires_delta=access_token_expires
#     )
#     return {"access_token": access_token, "token_type": "bearer"}

@router.post("/token", response_model=schemas.TokenResponse)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)  # form_data.username = email
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username},  # Good: subject is email
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.delete("/{user_id}", status_code=200)
def delete_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    if current_user.id != user_id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to delete this user")

    return crud.delete_user(db=db, user_id=user_id)




