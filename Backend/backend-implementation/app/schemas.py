from pydantic import BaseModel
from pydantic import EmailStr
from pydantic.generics import GenericModel
from typing import Optional, Dict, Any
from typing import Literal
from typing import Generic, TypeVar, List
from datetime import datetime

# Components
class ComponentBase(BaseModel):
    name: str
    category: str
    brand: str
    model: str
    price: float
    specs: Dict[str, Any]
    image_url: Optional[str] = None
    in_stock: bool = True

class ComponentCreate(ComponentBase):   #ComponentCreate is a subclass of ComponentBase
    pass

class Component(ComponentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config: 
        from_attributes = True

class ComponentResponse(BaseModel):
    success: bool = True
    component: Component

# User
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserBase(BaseModel):
    username: str
    email: EmailStr
    is_active: bool = True
    is_admin: bool = False
    email_verified: bool = False
    verification_token: Optional[str] = None

class User(UserBase):
    id: int
    last_login: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    success: bool = True
    user: User

#Compbatability Check

class CompatibilityCheckBase(BaseModel):
    category1: int
    category2: int
    rule_type: Optional[str] = None
    rule_logic: Optional[Dict[str, Any]] = None

class CompatibilityCheckCreate(CompatibilityCheckBase):
    pass

class CompatibilityCheck(CompatibilityCheckBase):
    id: int

    class Config:
        from_attributes = True

class CompatibilityCheckResponse(BaseModel):
    success: bool = True
    compatibility_check: CompatibilityCheck

# Build
class BuildBase(BaseModel):
    user_id: int
    name: str
    description: Optional[str] = None
    is_public: bool = True
    total_price: Optional[float] = None

class BuildCreate(BaseModel):
    name: str
    description: Optional[str] = None
    is_public: bool = True
    components: list[Dict[str, int]]

class Build(BaseModel):
    id: int
    user_id: int
    name: str
    description: Optional[str] = None
    is_public: bool = True
    total_price: Optional[float] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class BuildResponse(BaseModel):
    success: bool = True
    build: Build

# Build Component

class BuildComponentBase(BaseModel):
    build_id: int
    component_id: int
    quantity: int = 1

# class BuildComponentCreate(BuildComponentBase):
#     pass

class BuildComponentCreate(BaseModel):
    component_id: int
    quantity: int = 1

class BuildComponent(BuildComponentBase):
    id: int

    class Config:
        from_attributes = True

class BuildComponentResponse(BaseModel):
    success: bool = True
    build_component: BuildComponent

# Price History

class PriceHistoryBase(BaseModel):
    component_id: int
    price: float
    retailer: str
    url: Optional[str] = None
    date: datetime

class PriceHistoryCreate(PriceHistoryBase):
    pass

class PriceHistory(PriceHistoryBase):
    id: int

    class Config:
        from_attributes = True

class PriceHistoryResponse(BaseModel):
    success: bool = True
    price_history: PriceHistory

# Review
class ReviewBase(BaseModel):
    component_id: int
    rating: int
    title: Optional[str] = None
    content: Optional[str] = None
    verified: bool = False
    status: Literal["pending", "approved", "rejected"]

class ReviewCreate(ReviewBase):
    pass

class Review(ReviewBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ReviewResponse(BaseModel):
    success: bool = True
    review: Review

# Admin

class AdminBase(BaseModel):
    username: str
    permissions: Dict[str, bool]
    email: EmailStr
    is_active: bool
    role: str

class Admin(AdminBase):
    id: int
    last_login: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AdminResponse(BaseModel):
    success: bool = True
    admin: Admin

# Admin Settings

class AdminSettingBase(BaseModel):
    key: str
    value: Dict[str, Any]
    description: Optional[str] = None

class AdminSettingCreate(AdminSettingBase):
    updated_by: int

class AdminSetting(AdminSettingBase):
    id: int
    updated_at: datetime
    updated_by: int

    class Config:
        from_attributes = True

class AdminSettingResponse(BaseModel):
    success: bool = True
    setting: AdminSetting

# Reset Token
class ResetTokenBase(BaseModel):
    token: str
    user_id: Optional[int] = None
    admin_id: Optional[int] = None
    is_revoked: bool = False
    revoked_at: Optional[datetime] = None

class ResetTokenCreate(ResetTokenBase):
    pass

class ResetToken(ResetTokenBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ResetTokenResponse(BaseModel):
    success: bool = True
    reset_token: ResetToken

# Audit Log
class AuditLogBase(BaseModel):
    action: str
    entity_type: str
    entity_id: int
    user_id: Optional[int] = None
    admin_id: Optional[int] = None
    details: Dict[str, Any]
    timestamp: datetime

class AuditLogCreate(AuditLogBase):
    pass

class AuditLog(AuditLogBase):
    id: int

    class Config:
        from_attributes = True

class AuditLogResponse(BaseModel):
    success: bool = True
    audit_log: AuditLog

# Compatibility Result
class CompatibilityIssue(BaseModel):
    component_id: int
    issue_description: str

class CompatibilityResult(BaseModel):
    compatible: bool
    issues: list[CompatibilityIssue] = []

class CompatibilityResultResponse(BaseModel):
    success: bool = True
    result: CompatibilityResult

# Token Response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Token Data for Part 5
# class TokenData(BaseModel):
#     username: Optional[str] = None

class TokenData(BaseModel):
    user_id: Optional[str] = None


# Login Request
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Paginated Response

ItemType = TypeVar("ItemType")
class PaginatedResponse(GenericModel, Generic[ItemType]):
    items: List[ItemType]
    total: int
    page: int
    per_page: int


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

