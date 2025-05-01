from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import desc, and_, or_, func
from fastapi import HTTPException, status
from typing import List, Optional, Dict, Any, Tuple
from datetime import datetime, timedelta
from app.password_utils import get_password_hash

from . import models, schemas

# Component CRUD operations
def get_component(db: Session, component_id: int) -> models.Component:
    """Get a component by ID."""
    component = db.query(models.Component).filter(models.Component.id == component_id).first()
    if component is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Component with ID {component_id} not found"
        )
    return component

def get_components(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    category: Optional[str] = None,
    brand: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    in_stock: Optional[bool] = None
) -> List[models.Component]:
    """Get a list of components with filters and pagination."""
    query = db.query(models.Component)
    
    # Apply filters if provided
    if category:
        query = query.filter(models.Component.category == category)
    if brand:
        query = query.filter(models.Component.brand == brand)
    if min_price is not None:
        query = query.filter(models.Component.price >= min_price)
    if max_price is not None:
        query = query.filter(models.Component.price <= max_price)
    if in_stock is not None:
        query = query.filter(models.Component.in_stock == in_stock)
    
    return query.offset(skip).limit(limit).all()

def create_component(db: Session, component: schemas.ComponentCreate) -> models.Component:
    """Create a new component."""
    try:
        db_component = models.Component(**component.dict())
        db.add(db_component)
        db.commit()
        db.refresh(db_component)
        return db_component
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error creating component, check for duplicate entries"
        )

def update_component(db: Session, component_id: int, component: schemas.ComponentBase) -> models.Component:
    """Update an existing component."""
    db_component = get_component(db, component_id)
    
    # Update component fields
    update_data = component.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_component, key, value)
    
    # Update the updated_at timestamp
    db_component.updated_at = datetime.now()
    
    try:
        db.add(db_component)
        db.commit()
        db.refresh(db_component)
        return db_component
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error updating component"
        )

def delete_component(db: Session, component_id: int) -> dict:
    """Delete a component."""
    db_component = get_component(db, component_id)
    try:
        db.delete(db_component)
        db.commit()
        return {"message": f"Component with ID {component_id} deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting component: {str(e)}"
        )

# def delete_component(db: Session, component_id: int):
#     from app.models import Component, BuildComponent

#     # First, delete dependent rows in build_components
#     db.query(BuildComponent).filter(BuildComponent.component_id == component_id).delete()

#     # Then delete the component itself
#     component = db.query(Component).filter(Component.id == component_id).first()
#     if not component:
#         raise HTTPException(status_code=404, detail="Component not found")
    
#     db.delete(component)
#     db.commit()
#     return {"success": True}



# User CRUD operations
def get_user(db: Session, user_id: int) -> models.User:
    """Get a user by ID."""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with ID {user_id} not found"
        )
    return user

def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    """Get a user by email."""
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str) -> Optional[models.User]:
    """Get a user by username."""
    return db.query(models.User).filter(models.User.username == username).first()

def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[models.User]:
    """Get a list of users with pagination."""
    return db.query(models.User).offset(skip).limit(limit).all()

# def create_user(db: Session, user: schemas.UserCreate) -> models.User:
#     """Create a new user."""
#     # Check if email already exists
#     db_user = get_user_by_email(db, email=user.email)
#     if db_user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Email already registered"
#         )
    
#     # Check if username already exists
#     db_user = get_user_by_username(db, username=user.username)
#     if db_user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Username already taken"
#         )
    
#     # Create hashed password in a real application
#     # For demo purposes, we'll just use the plain password
#     # In production, use: hashed_password = pwd_context.hash(user.password)
    
#     try:
#         db_user = models.User(
#             username=user.username,
#             email=user.email,
#             hashed_password=user.password,  # Replace with hashed_password in production
#             is_active=True,
#             is_admin=False,
#             email_verified=False
#         )
#         db.add(db_user)
#         db.commit()
#         db.refresh(db_user)
#         return db_user
#     except IntegrityError:
#         db.rollback()
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Error creating user"
#         )

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    """Create a new user."""
    # Check if email already exists
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username already exists
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Secure password hashing
    hashed_password = get_password_hash(user.password)

    try:
        db_user = models.User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_password,
            is_active=True,
            is_admin=False,
            email_verified=False
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error creating user"
        )

def update_user(db: Session, user_id: int, user_update: Dict[str, Any]) -> models.User:
    """Update an existing user."""
    db_user = get_user(db, user_id)
    
    # If email is being updated, check it's not already taken
    if "email" in user_update and user_update["email"] != db_user.email:
        existing_user = get_user_by_email(db, email=user_update["email"])
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
    
    # If username is being updated, check it's not already taken
    if "username" in user_update and user_update["username"] != db_user.username:
        existing_user = get_user_by_username(db, username=user_update["username"])
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
    
    # Update user fields
    for key, value in user_update.items():
        # Skip password as it needs special handling
        if key != "password":
            setattr(db_user, key, value)
    
    # Handle password update if provided
    if "password" in user_update:
        # In production: db_user.hashed_password = pwd_context.hash(user_update["password"])
        db_user.hashed_password = user_update["password"]
    
    # Update the updated_at timestamp
    db_user.updated_at = datetime.now()
    
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error updating user"
        )

def delete_user(db: Session, user_id: int) -> dict:
    """Delete a user."""
    db_user = get_user(db, user_id)
    try:
        db.delete(db_user)
        db.commit()
        return {"message": f"User with ID {user_id} deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting user: {str(e)}"
        )

# Build CRUD operations
def get_build(db: Session, build_id: int) -> models.Build:
    """Get a build by ID."""
    build = db.query(models.Build).filter(models.Build.id == build_id).first()
    if build is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Build with ID {build_id} not found"
        )
    return build

def get_builds(
    db: Session, 
    user_id: Optional[int] = None,
    is_public: Optional[bool] = None,
    skip: int = 0, 
    limit: int = 100
) -> List[models.Build]:
    """Get a list of builds with filters and pagination."""
    query = db.query(models.Build)
    
    # Apply filters if provided
    if user_id:
        query = query.filter(models.Build.user_id == user_id)
    if is_public is not None:
        query = query.filter(models.Build.is_public == is_public)
    
    return query.order_by(desc(models.Build.created_at)).offset(skip).limit(limit).all()

def create_build(db: Session, build: schemas.BuildCreate, user_id: int) -> models.Build:
    """Create a new build with components."""
    # First verify that user exists
    get_user(db, user_id)
    
    # Calculate total price based on components
    total_price = 0.0
    components_to_add = []
    
    # Verify all components exist and calculate total price
    for component_entry in build.components:
        component_id = component_entry.get("component_id")
        quantity = component_entry.get("quantity", 1)
        
        if not component_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Missing component_id in components list"
            )
        
        # Get component to verify it exists and get its price
        component = get_component(db, component_id)
        total_price += component.price * quantity
        
        # Store for later use
        components_to_add.append({"component_id": component_id, "quantity": quantity})
    
    try:
        # Create the build
        db_build = models.Build(
            user_id=user_id,
            name=build.name,
            description=build.description,
            is_public=build.is_public,
            total_price=total_price
        )
        db.add(db_build)
        db.flush()  # Get the build ID without committing
        
        # Add components to the build
        for component_data in components_to_add:
            db_build_component = models.BuildComponent(
                build_id=db_build.id,
                component_id=component_data["component_id"],
                quantity=component_data["quantity"]
            )
            db.add(db_build_component)
        
        db.commit()
        db.refresh(db_build)
        return db_build
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error creating build"
        )

def update_build(db: Session, build_id: int, build_update: Dict[str, Any]) -> models.Build:
    """Update an existing build."""
    db_build = get_build(db, build_id)
    
    # Update basic build fields
    if "name" in build_update:
        db_build.name = build_update["name"]
    if "description" in build_update:
        db_build.description = build_update["description"]
    if "is_public" in build_update:
        db_build.is_public = build_update["is_public"]
    
    # Update the updated_at timestamp
    db_build.updated_at = datetime.now()
    
    try:
        db.add(db_build)
        db.commit()
        db.refresh(db_build)
        return db_build
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error updating build"
        )

def delete_build(db: Session, build_id: int) -> dict:
    """Delete a build."""
    db_build = get_build(db, build_id)
    try:
        # First delete all build components
        db.query(models.BuildComponent).filter(
            models.BuildComponent.build_id == build_id
        ).delete()
        
        # Then delete the build
        db.delete(db_build)
        db.commit()
        return {"message": f"Build with ID {build_id} deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting build: {str(e)}"
        )

# BuildComponent CRUD operations
def get_build_component(db: Session, build_component_id: int) -> models.BuildComponent:
    """Get a build component by ID."""
    build_component = db.query(models.BuildComponent).filter(
        models.BuildComponent.id == build_component_id
    ).first()
    if build_component is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Build component with ID {build_component_id} not found"
        )
    return build_component

def get_build_components(db: Session, build_id: int) -> List[models.BuildComponent]:
    """Get all components in a build."""
    return db.query(models.BuildComponent).filter(
        models.BuildComponent.build_id == build_id
    ).all()

def add_component_to_build(
    db: Session, 
    build_id: int, 
    component_id: int, 
    quantity: int = 1
) -> models.BuildComponent:
    """Add a component to a build."""
    # Verify build exists
    build = get_build(db, build_id)
    
    # Verify component exists and get its price
    component = get_component(db, component_id)
    
    # Check if component already exists in this build
    existing = db.query(models.BuildComponent).filter(
        models.BuildComponent.build_id == build_id,
        models.BuildComponent.component_id == component_id
    ).first()
    
    if existing:
        # Update quantity instead of creating new
        existing.quantity += quantity
        db_build_component = existing
    else:
        # Create new build component
        db_build_component = models.BuildComponent(
            build_id=build_id,
            component_id=component_id,
            quantity=quantity
        )
        db.add(db_build_component)
    
    # Update build total price
    build.total_price = (build.total_price or 0) + (component.price * quantity)
    build.updated_at = datetime.now()
    
    try:
        db.commit()
        db.refresh(db_build_component)
        db.refresh(build)
        return db_build_component
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error adding component to build"
        )

def update_build_component(
    db: Session, 
    build_component_id: int, 
    quantity: int
) -> models.BuildComponent:
    """Update quantity of a component in a build."""
    db_build_component = get_build_component(db, build_component_id)
    
    # Get related build and component for price update
    build = get_build(db, db_build_component.build_id)
    component = get_component(db, db_build_component.component_id)
    
    # Calculate price difference
    price_difference = component.price * (quantity - db_build_component.quantity)
    
    # Update quantity
    db_build_component.quantity = quantity
    db_build_component.updated_at = datetime.now()
    
    # Update build total price
    build.total_price = (build.total_price or 0) + price_difference
    build.updated_at = datetime.now()
    
    try:
        db.add(db_build_component)
        db.add(build)
        db.commit()
        db.refresh(db_build_component)
        return db_build_component
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error updating build component"
        )

def remove_component_from_build(db: Session, build_component_id: int) -> dict:
    """Remove a component from a build."""
    db_build_component = get_build_component(db, build_component_id)
    
    # Get related build and component for price update
    build = get_build(db, db_build_component.build_id)
    component = get_component(db, db_build_component.component_id)
    
    # Calculate price to subtract
    price_to_subtract = component.price * db_build_component.quantity
    
    # Update build total price
    build.total_price = (build.total_price or 0) - price_to_subtract
    build.updated_at = datetime.now()
    
    try:
        db.delete(db_build_component)
        db.add(build)
        db.commit()
        return {"message": f"Component removed from build successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error removing component from build: {str(e)}"
        )

# Review CRUD operations
def get_review(db: Session, review_id: int) -> models.Review:
    """Get a review by ID."""
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with ID {review_id} not found"
        )
    return review

def get_reviews(
    db: Session, 
    component_id: Optional[int] = None,
    user_id: Optional[int] = None,
    status: Optional[str] = None,
    skip: int = 0, 
    limit: int = 100
) -> List[models.Review]:
    """Get reviews with filters and pagination."""
    query = db.query(models.Review)
    
    # Apply filters if provided
    if component_id:
        query = query.filter(models.Review.component_id == component_id)
    if user_id:
        query = query.filter(models.Review.user_id == user_id)
    if status:
        query = query.filter(models.Review.status == status)
    
    return query.order_by(desc(models.Review.created_at)).offset(skip).limit(limit).all()

def create_review(db: Session, review: schemas.ReviewCreate, user_id: int) -> models.Review:
    # Confirm the component exists
    get_component(db, review.component_id)

    # Check if this user already left a review
    existing = db.query(models.Review).filter(
        models.Review.user_id == user_id,
        models.Review.component_id == review.component_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already reviewed this component"
        )

    try:
        db_review = models.Review(**review.dict(), user_id=user_id)
        db.add(db_review)
        db.commit()
        db.refresh(db_review)
        return db_review
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error creating review"
        )
        
def update_review(db: Session, review_id: int, review_update: Dict[str, Any]) -> models.Review:
    """Update an existing review."""
    db_review = get_review(db, review_id)
    
    # Update review fields
    for key, value in review_update.items():
        setattr(db_review, key, value)
    
    # Update the updated_at timestamp
    db_review.updated_at = datetime.now()
    
    try:
        db.add(db_review)
        db.commit()
        db.refresh(db_review)
        return db_review
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error updating review"
        )

def delete_review(db: Session, review_id: int, user_id: int) -> dict:
    """Delete a review if the user is the owner."""
    db_review = get_review(db, review_id)
    
    if db_review.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to delete this review."
        )

    try:
        db.delete(db_review)
        db.commit()
        return {"message": f"Review with ID {review_id} deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting review: {str(e)}"
        )

# Price History CRUD operations
def get_price_history(db: Session, price_history_id: int) -> models.PriceHistory:
    """Get a price history entry by ID."""
    price_history = db.query(models.PriceHistory).filter(
        models.PriceHistory.id == price_history_id
    ).first()
    if price_history is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Price history with ID {price_history_id} not found"
        )
    return price_history

def get_price_histories(
    db: Session, 
    component_id: Optional[int] = None,
    retailer: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    skip: int = 0, 
    limit: int = 100
) -> List[models.PriceHistory]:
    """Get price histories with filters and pagination."""
    query = db.query(models.PriceHistory)
    
    # Apply filters if provided
    if component_id:
        query = query.filter(models.PriceHistory.component_id == component_id)
    if retailer:
        query = query.filter(models.PriceHistory.retailer == retailer)
    if start_date:
        query = query.filter(models.PriceHistory.date >= start_date)
    if end_date:
        query = query.filter(models.PriceHistory.date <= end_date)
    
    return query.order_by(models.PriceHistory.date).offset(skip).limit(limit).all()

def create_price_history(db: Session, price_history: schemas.PriceHistoryCreate) -> models.PriceHistory:
    """Create a new price history entry."""
    # Verify component exists
    get_component(db, price_history.component_id)
    
    try:
        db_price_history = models.PriceHistory(**price_history.dict())
        db.add(db_price_history)
        db.commit()
        db.refresh(db_price_history)
        
        # Update component price if this is the latest price
        component = get_component(db, price_history.component_id)
        if price_history.date >= datetime.now():
            component.price = price_history.price
            component.updated_at = datetime.now()
            db.add(component)
            db.commit()
        
        return db_price_history
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error creating price history"
        )

def delete_price_history(db: Session, price_history_id: int) -> dict:
    """Delete a price history entry."""
    db_price_history = get_price_history(db, price_history_id)
    try:
        db.delete(db_price_history)
        db.commit()
        return {"message": f"Price history with ID {price_history_id} deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting price history: {str(e)}"
        )

# Compatibility Check CRUD operations
def get_compatibility_check(db: Session, compatibility_check_id: int) -> models.CompatibilityCheck:
    """Get a compatibility check by ID."""
    compatibility_check = db.query(models.CompatibilityCheck).filter(
        models.CompatibilityCheck.id == compatibility_check_id
    ).first()
    if compatibility_check is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Compatibility check with ID {compatibility_check_id} not found"
        )
    return compatibility_check

def get_compatibility_checks(
    db: Session, 
    component1_id: Optional[int] = None,
    component2_id: Optional[int] = None,
    rule_type: Optional[str] = None,
    skip: int = 0, 
    limit: int = 100
) -> List[models.CompatibilityCheck]:
    """Get compatibility checks with filters and pagination."""
    query = db.query(models.CompatibilityCheck)
    
    # Apply filters if provided
    if component1_id:
        query = query.filter(models.CompatibilityCheck.component1_id == component1_id)
    if component2_id:
        query = query.filter(models.CompatibilityCheck.component2_id == component2_id)
    if rule_type:
        query = query.filter(models.CompatibilityCheck.rule_type == rule_type)
    
    return query.offset(skip).limit(limit).all()

def create_compatibility_check(db: Session, compatibility_check: Dict[str, Any]) -> models.CompatibilityCheck:
    """Create a new compatibility check using a dictionary input.
    
    Args:
        db: Database session
        compatibility_check: Dictionary with component1_id, component2_id, rule_type, and rule_logic
        
    Returns:
        The created compatibility check object
    """
    # Verify components exist
    get_component(db, compatibility_check["component1_id"])
    get_component(db, compatibility_check["component2_id"])
    
    try:
        db_compatibility_check = models.CompatibilityCheck(
            component1_id=compatibility_check["component1_id"],
            component2_id=compatibility_check["component2_id"],
            rule_type=compatibility_check.get("rule_type"),
            rule_logic=compatibility_check.get("rule_logic")
        )
        db.add(db_compatibility_check)
        db.commit()
        db.refresh(db_compatibility_check)
        return db_compatibility_check
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error creating compatibility check"
        )

def update_compatibility_check(
    db: Session, 
    compatibility_check_id: int, 
    compatibility_check_update: Dict[str, Any]
) -> models.CompatibilityCheck:
    """Update an existing compatibility check."""
    db_compatibility_check = get_compatibility_check(db, compatibility_check_id)
    
    # Update compatibility check fields
    for key, value in compatibility_check_update.items():
        setattr(db_compatibility_check, key, value)
    
    # Update the updated_at timestamp
    db_compatibility_check.updated_at = datetime.now()
    
    try:
        db.add(db_compatibility_check)
        db.commit()
        db.refresh(db_compatibility_check)
        return db_compatibility_check
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error updating compatibility check"
        )

def delete_compatibility_check(db: Session, compatibility_check_id: int) -> dict:
    """Delete a compatibility check."""
    db_compatibility_check = get_compatibility_check(db, compatibility_check_id)
    try:
        db.delete(db_compatibility_check)
        db.commit()
        return {"message": f"Compatibility check with ID {compatibility_check_id} deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting compatibility check: {str(e)}"
        )
# Specialized component search and filtering functions
def search_components(
    db: Session,
    search_query: str,
    category: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
) -> List[models.Component]:
    """
    Search for components by name, brand, or model.
    
    Args:
        db: Database session
        search_query: Search term
        category: Optional component category filter
        skip: Number of records to skip (pagination)
        limit: Max number of records to return
        
    Returns:
        List of matching components
    """
    # Convert search query to lowercase for case-insensitive search
    search_term = f"%{search_query.lower()}%"
    
    query = db.query(models.Component).filter(
        or_(
            func.lower(models.Component.name).like(search_term),
            func.lower(models.Component.brand).like(search_term),
            func.lower(models.Component.model).like(search_term)
        )
    )
    
    if category:
        query = query.filter(models.Component.category == category)
    
    return query.order_by(models.Component.name).offset(skip).limit(limit).all()

def filter_components_by_specs(
    db: Session,
    category: str,
    specs_filters: Dict[str, Any],
    skip: int = 0,
    limit: int = 100
) -> List[models.Component]:
    """
    Filter components by their specifications.
    
    Args:
        db: Database session
        category: Component category
        specs_filters: Dictionary of spec filters to apply
        skip: Number of records to skip (pagination)
        limit: Max number of records to return
        
    Returns:
        List of matching components
    """
    # Start with basic category filter
    query = db.query(models.Component).filter(models.Component.category == category)
    
    # Process each spec filter
    for spec_key, spec_value in specs_filters.items():
        # Handle range filters (min/max values)
        if isinstance(spec_value, dict) and ("min" in spec_value or "max" in spec_value):
            if "min" in spec_value:
                # JSON query to check if the numeric value is >= min
                # Example: specs->>'cores' >= '8'
                query = query.filter(
                    func.cast(func.json_extract_path_text(
                        models.Component.specs, spec_key
                    ), func.pg_catalog.float8) >= spec_value["min"]
                )
            
            if "max" in spec_value:
                # JSON query to check if the numeric value is <= max
                query = query.filter(
                    func.cast(func.json_extract_path_text(
                        models.Component.specs, spec_key
                    ), func.pg_catalog.float8) <= spec_value["max"]
                )
        else:
            # For exact match, use string comparison
            # Example: specs->>'socket' = 'LGA1700'
            query = query.filter(
                func.json_extract_path_text(models.Component.specs, spec_key) == str(spec_value)
            )
    
    return query.offset(skip).limit(limit).all()
# Compatibility check functions
def check_compatibility(db: Session, component_ids: List[int]) -> Dict[str, Any]:
    """
    Check if a set of components are compatible with each other.
    
    Args:
        db: Database session
        component_ids: List of component IDs to check
        
    Returns:
        Dictionary with compatibility results
    """
    # Get all components by IDs
    components = []
    for component_id in component_ids:
        component = db.query(models.Component).filter(models.Component.id == component_id).first()
        if not component:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Component with ID {component_id} not found"
            )
        components.append(component)
    
    # Group components by category for easier processing
    components_by_category = {}
    for component in components:
        if component.category not in components_by_category:
            components_by_category[component.category] = []
        components_by_category[component.category].append(component)
    
    # Run compatibility checks
    compatible = True
    issues = []
    
    # Check CPU-Motherboard compatibility
    if "CPU" in components_by_category and "Motherboard" in components_by_category:
        cpu = components_by_category["CPU"][0]  # Assume one CPU for simplicity
        motherboard = components_by_category["Motherboard"][0]  # Assume one motherboard
        
        # Check socket compatibility
        cpu_socket = cpu.specs.get("socket")
        mb_socket = motherboard.specs.get("cpu_socket")
        
        if cpu_socket and mb_socket and cpu_socket != mb_socket:
            compatible = False
            issues.append({
                "component_id": cpu.id,
                "issue_description": f"CPU socket ({cpu_socket}) is not compatible with motherboard socket ({mb_socket})"
            })
    
    # Check RAM-Motherboard compatibility
    if "RAM" in components_by_category and "Motherboard" in components_by_category:
        ram = components_by_category["RAM"][0]  # Assume one RAM kit for simplicity
        motherboard = components_by_category["Motherboard"][0]
        
        # Check memory type compatibility
        ram_type = ram.specs.get("type")
        mb_ram_type = motherboard.specs.get("memory_type")
        
        if ram_type and mb_ram_type and ram_type != mb_ram_type:
            compatible = False
            issues.append({
                "component_id": ram.id,
                "issue_description": f"RAM type ({ram_type}) is not compatible with motherboard memory type ({mb_ram_type})"
            })
    
    # Return compatibility result
    return {
        "compatible": compatible,
        "issues": issues
    }

def calculate_power_requirements(db: Session, component_ids: List[int]) -> Dict[str, Any]:
    """
    Calculate the estimated power requirements for a build.
    
    Args:
        db: Database session
        component_ids: List of component IDs in the build
        
    Returns:
        Dictionary with power requirement results
    """
    # Get all components by IDs
    components = []
    for component_id in component_ids:
        component = db.query(models.Component).filter(models.Component.id == component_id).first()
        if component:
            components.append(component)
    
    # Initialize power calculations
    total_power = 0
    power_breakdown = {}
    
    # Calculate power by component
    for component in components:
        component_power = 0
        
        # Extract TDP or power rating from specs based on component category
        if component.category == "CPU":
            component_power = component.specs.get("tdp", 0)
        elif component.category == "GPU":
            component_power = component.specs.get("tdp", 0)
        elif component.category == "RAM":
            # Estimate RAM power - typically 3-5W per DIMM
            dimm_count = component.specs.get("modules", 1)
            component_power = dimm_count * 5
        elif component.category == "Storage":
            # Estimate storage power based on type
            if component.specs.get("type") == "HDD":
                component_power = 10
            else:  # SSD or NVME
                component_power = 5
        elif component.category == "Cooler":
            component_power = component.specs.get("power_consumption", 0)
        elif component.category == "Case":
            # Case fans
            component_power = component.specs.get("included_fans", 0) * 3
        
        # Add to total and breakdown
        total_power += component_power
        power_breakdown[component.id] = {
            "name": component.name,
            "category": component.category,
            "power_watts": component_power
        }
    
    # Add 20% overhead for efficiency and other components
    recommended_psu = int(total_power * 1.2)
    
    # Round up to nearest common PSU wattage
    common_psu_watts = [450, 500, 550, 600, 650, 750, 850, 1000, 1200, 1500]
    for wattage in common_psu_watts:
        if wattage >= recommended_psu:
            recommended_psu = wattage
            break
    
    return {
        "total_power_watts": total_power,
        "recommended_psu_watts": recommended_psu,
        "power_breakdown": power_breakdown
    }

# Price tracking and analysis
def get_component_price_history(
    db: Session,
    component_id: int,
    days: int = 30
) -> List[models.PriceHistory]:
    """
    Get price history for a component over a specified time period.
    
    Args:
        db: Database session
        component_id: Component ID
        days: Number of days of history to retrieve
        
    Returns:
        List of price history entries
    """
    # Calculate start date
    start_date = datetime.now() - timedelta(days=days)
    
    return db.query(models.PriceHistory).filter(
        models.PriceHistory.component_id == component_id,
        models.PriceHistory.date >= start_date
    ).order_by(models.PriceHistory.date).all()

def get_price_trends(db: Session, component_id: int) -> Dict[str, Any]:
    """
    Analyze price trends for a component.
    
    Args:
        db: Database session
        component_id: Component ID
        
    Returns:
        Price trend analysis
    """
    # Get price history records for different time periods
    month_ago = datetime.now() - timedelta(days=30)
    week_ago = datetime.now() - timedelta(days=7)
    
    # Get current price
    component = db.query(models.Component).filter(
        models.Component.id == component_id
    ).first()
    
    if not component:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Component with ID {component_id} not found"
        )
    
    current_price = component.price
    
    # Get oldest price from last month
    month_old_price_record = db.query(models.PriceHistory).filter(
        models.PriceHistory.component_id == component_id,
        models.PriceHistory.date <= month_ago
    ).order_by(desc(models.PriceHistory.date)).first()
    
    month_old_price = month_old_price_record.price if month_old_price_record else current_price
    
    # Get oldest price from last week
    week_old_price_record = db.query(models.PriceHistory).filter(
        models.PriceHistory.component_id == component_id,
        models.PriceHistory.date <= week_ago
    ).order_by(desc(models.PriceHistory.date)).first()
    
    week_old_price = week_old_price_record.price if week_old_price_record else current_price
    
    # Calculate price changes
    month_change = current_price - month_old_price
    month_change_percent = (month_change / month_old_price) * 100 if month_old_price > 0 else 0
    
    week_change = current_price - week_old_price
    week_change_percent = (week_change / week_old_price) * 100 if week_old_price > 0 else 0
    
    # Get all-time low price
    all_time_low_record = db.query(models.PriceHistory).filter(
        models.PriceHistory.component_id == component_id
    ).order_by(models.PriceHistory.price).first()
    
    all_time_low = all_time_low_record.price if all_time_low_record else current_price
    all_time_low_date = all_time_low_record.date if all_time_low_record else None
    
    # Return trend analysis
    return {
        "current_price": current_price,
        "month_ago_price": month_old_price,
        "week_ago_price": week_old_price,
        "month_change": month_change,
        "month_change_percent": month_change_percent,
        "week_change": week_change,
        "week_change_percent": week_change_percent,
        "all_time_low": all_time_low,
        "all_time_low_date": all_time_low_date,
        "is_all_time_low": current_price <= all_time_low
    }

# User builds and sharing
def get_public_builds(
    db: Session,
    skip: int = 0,
    limit: int = 10
) -> List[models.Build]:
    """
    Get a list of public builds.
    
    Args:
        db: Database session
        skip: Number of records to skip (pagination)
        limit: Max number of records to return
        
    Returns:
        List of public builds
    """
    return db.query(models.Build).filter(
        models.Build.is_public == True
    ).order_by(desc(models.Build.created_at)).offset(skip).limit(limit).all()

def clone_build(db: Session, build_id: int, user_id: int, new_name: str) -> models.Build:
    """
    Clone an existing build for a user.
    
    Args:
        db: Database session
        build_id: ID of the build to clone
        user_id: ID of the user who will own the clone
        new_name: Name for the cloned build
        
    Returns:
        Newly created build
    """
    # Get the original build
    original_build = db.query(models.Build).filter(models.Build.id == build_id).first()
    if not original_build:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Build with ID {build_id} not found"
        )
    
    # Verify it's either a public build or belongs to the user
    if not original_build.is_public and original_build.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot clone a private build from another user"
        )
    
    # Create a new build
    new_build = models.Build(
        user_id=user_id,
        name=new_name,
        description=f"Cloned from {original_build.name}",
        is_public=False,  # Default to private for the clone
        total_price=original_build.total_price
    )
    
    db.add(new_build)
    db.flush()  # Get the ID without committing
    
    # Get all components from the original build
    build_components = db.query(models.BuildComponent).filter(
        models.BuildComponent.build_id == build_id
    ).all()
    
    # Add the same components to the new build
    for component in build_components:
        new_component = models.BuildComponent(
            build_id=new_build.id,
            component_id=component.component_id,
            quantity=component.quantity
        )
        db.add(new_component)
    
    # Commit the transaction
    try:
        db.commit()
        db.refresh(new_build)
        return new_build
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error cloning build"
        )

# Analytics and statistics
def get_popular_components(
    db: Session, 
    category: Optional[str] = None,
    days: int = 30,
    limit: int = 10
) -> List[Tuple[models.Component, int]]:
    """
    Get the most popular components based on how often they appear in builds.
    
    Args:
        db: Database session
        category: Optional component category filter
        days: Time period in days
        limit: Number of components to return
        
    Returns:
        List of components with their build count
    """
    # Calculate start date
    start_date = datetime.now() - timedelta(days=days)
    
    # Query builds created in the time period
    recent_builds = db.query(models.Build).filter(
        models.Build.created_at >= start_date
    ).all()
    
    build_ids = [build.id for build in recent_builds]
    
    # Base query to count components in these builds
    query = db.query(
        models.Component,
        func.count(models.BuildComponent.id).label('count')
    ).join(
        models.BuildComponent,
        models.Component.id == models.BuildComponent.component_id
    ).filter(
        models.BuildComponent.build_id.in_(build_ids)
    ).group_by(
        models.Component.id
    ).order_by(
        desc('count')
    )
    
    # Apply category filter if provided
    if category:
        query = query.filter(models.Component.category == category)
    
    # Get results
    return query.limit(limit).all()
# Admin CRUD operations
def get_admin(db: Session, admin_id: int) -> models.Admin:
    """Get an admin by ID."""
    admin = db.query(models.Admin).filter(models.Admin.id == admin_id).first()
    if admin is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Admin with ID {admin_id} not found"
        )
    return admin

def get_admin_by_email(db: Session, email: str) -> Optional[models.Admin]:
    """Get an admin by email."""
    return db.query(models.Admin).filter(models.Admin.email == email).first()

def get_admins(db: Session, skip: int = 0, limit: int = 100) -> List[models.Admin]:
    """Get a list of admins with pagination."""
    return db.query(models.Admin).offset(skip).limit(limit).all()

def create_admin(db: Session, admin_data: Dict[str, Any]) -> models.Admin:
    """Create a new admin."""
    # Check if email already exists
    db_admin = get_admin_by_email(db, email=admin_data["email"])
    if db_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create hashed password in a real application
    # For demo purposes, we'll just use the plain password
    # In production, use: hashed_password = pwd_context.hash(admin_data["password"])
    
    try:
        db_admin = models.Admin(
            username=admin_data["username"],
            email=admin_data["email"],
            hashed_password=admin_data["password"],  # Replace with hashed_password in production
            permissions=admin_data["permissions"],
            role=admin_data["role"],
            is_active=admin_data.get("is_active", True)
        )
        db.add(db_admin)
        db.commit()
        db.refresh(db_admin)
        return db_admin
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error creating admin"
        )
def update_admin(db: Session, admin_id: int, admin_update: Dict[str, Any]) -> models.Admin:
    """Update an existing admin."""
    db_admin = get_admin(db, admin_id)
    
    # If email is being updated, check it's not already taken
    if "email" in admin_update and admin_update["email"] != db_admin.email:
        existing_admin = get_admin_by_email(db, email=admin_update["email"])
        if existing_admin:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
    
    # Update admin fields
    for key, value in admin_update.items():
        # Skip password as it needs special handling
        if key != "password":
            setattr(db_admin, key, value)
    
    # Handle password update if provided
    if "password" in admin_update:
        # In production: db_admin.hashed_password = pwd_context.hash(admin_update["password"])
        db_admin.hashed_password = admin_update["password"]
    
    # Update the updated_at timestamp
    db_admin.updated_at = datetime.now()
    
    try:
        db.add(db_admin)
        db.commit()
        db.refresh(db_admin)
        return db_admin
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error updating admin"
        )

def delete_admin(db: Session, admin_id: int) -> dict:
    """Delete an admin."""
    db_admin = get_admin(db, admin_id)
    try:
        # Check if this is the last admin
        admin_count = db.query(models.Admin).count()
        if admin_count <= 1:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete the last admin account"
            )
        
        db.delete(db_admin)
        db.commit()
        return {"message": f"Admin with ID {admin_id} deleted successfully"}
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting admin: {str(e)}"
        )