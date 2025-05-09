from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from typing import Dict

from .. import crud, models, schemas
from ..database import get_db
from ..auth import authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_active_user, verify_password, get_password_hash

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

# @router.post("/", response_model=schemas.UserResponse)
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = crud.get_user_by_email(db, email=user.email)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     return {"success": True, "user": crud.create_user(db=db, user=user)}

@router.get("/me", response_model=schemas.UserResponse)
async def read_users_me(current_user: models.User = Depends(get_current_active_user)):
    return {"success": True, "user": current_user}
@router.post("/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    
    password = user.password
    if not (
        len(password) >= 8 and
        any(c.isupper() for c in password) and
        any(c.islower() for c in password) and
        any(c.isdigit() for c in password) and
        any(not c.isalnum() for c in password)
    ):
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character."
        )

    return {"success": True, "user": crud.create_user(db=db, user=user)}

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
        
        data={"sub": str(user.id)},
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


@router.put("/me", response_model=schemas.UserResponse)
def update_own_user(
    user_update: Dict[str, str],
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    return {
        "success": True,
        "user": crud.update_user(db, user_id=current_user.id, user_update=user_update)
    }


# @router.put("/me/password", status_code=200)
# def change_password(
#     passwords: schemas.ChangePasswordRequest,
#     db: Session = Depends(get_db),
#     current_user: models.User = Depends(get_current_active_user)
# ):
#     if not verify_password(passwords.current_password, current_user.hashed_password):
#         raise HTTPException(status_code=400, detail="Incorrect current password")
    
#     current_user.hashed_password = get_password_hash(passwords.new_password)
#     current_user.updated_at = datetime.now()
#     db.add(current_user)
#     db.commit()
#     return {"success": True, "message": "Password updated successfully"}

@router.put("/me/password", response_model=schemas.UserResponse)
def change_password(
    passwords: schemas.ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    if not verify_password(passwords.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect current password")
    
    current_user.hashed_password = get_password_hash(passwords.new_password)
    current_user.updated_at = datetime.now()

    db.add(current_user)
    db.commit()
    db.refresh(current_user)

    return {"success": True, "user": current_user}