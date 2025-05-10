from sqlalchemy import Boolean, Column, Integer, String, Float, JSON, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

# Component
class Component(Base):
    __tablename__ = "components"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    category = Column(String, nullable=False, index=True)
    brand = Column(String, nullable=False, index=True)
    model = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    specs = Column(JSON, nullable=False)
    image_url = Column(String, nullable=True)
    in_stock = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    price_history = relationship("PriceHistory", back_populates="component")
    reviews = relationship("Review", back_populates="component")
    compatibility_checks = relationship("CompatibilityCheck", back_populates="component1", foreign_keys="[CompatibilityCheck.component1_id]")
    build_components = relationship("BuildComponent", back_populates="component")

# User
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    hashed_password = Column(String, nullable=False)
    last_login = Column(DateTime, nullable=True)
    email_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    verification_token = Column(String, nullable=True, unique=True)

    # Relationships
    builds = relationship("Build", back_populates="user")
    reviews = relationship("Review", back_populates="user")
    reset_tokens = relationship("ResetToken", back_populates="user")
    audit_logs = relationship("AuditLog", back_populates="user")

# CompatibilityCheck
class CompatibilityCheck(Base):
    __tablename__ = "compatibility_checks"

    id = Column(Integer, primary_key=True, index=True)
    component1_id = Column(Integer, ForeignKey("components.id"), nullable=False)
    component2_id = Column(Integer, ForeignKey("components.id"), nullable=False)
    rule_type = Column(String, nullable=True)
    rule_logic = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    component1 = relationship("Component", foreign_keys=[component1_id], back_populates="compatibility_checks")
    component2 = relationship("Component", foreign_keys=[component2_id])

# Build
class Build(Base):
    __tablename__ = "builds"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    is_public = Column(Boolean, default=True)
    total_price = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    user = relationship("User", back_populates="builds")
    build_components = relationship("BuildComponent", back_populates="build")

# BuildComponent
class BuildComponent(Base):
    __tablename__ = "build_components"

    id = Column(Integer, primary_key=True, index=True)
    build_id = Column(Integer, ForeignKey("builds.id"), nullable=False)
    component_id = Column(Integer, ForeignKey("components.id"), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    build = relationship("Build", back_populates="build_components")
    component = relationship("Component", back_populates="build_components")

# PriceHistory
class PriceHistory(Base):
    __tablename__ = "price_history"

    id = Column(Integer, primary_key=True, index=True)
    component_id = Column(Integer, ForeignKey("components.id"), nullable=False)
    price = Column(Float, nullable=False)
    retailer = Column(String, nullable=False)
    url = Column(String, nullable=True)
    date = Column(DateTime, default=datetime.now)

    # Relationships
    component = relationship("Component", back_populates="price_history")

# Review
class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    component_id = Column(Integer, ForeignKey("components.id"), nullable=False)
    rating = Column(Integer, nullable=False)
    title = Column(String, nullable=True)
    content = Column(Text, nullable=True)
    verified = Column(Boolean, default=False)
    status = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    user = relationship("User", back_populates="reviews")
    component = relationship("Component", back_populates="reviews")

# ResetToken
class ResetToken(Base):
    __tablename__ = "reset_tokens"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    admin_id = Column(Integer, ForeignKey("admins.id"), nullable=True)
    is_revoked = Column(Boolean, default=False)
    revoked_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.now)

    # Relationships
    user = relationship("User", back_populates="reset_tokens")
    admin = relationship("Admin", back_populates="reset_tokens")

# AuditLog
class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String, nullable=False)
    entity_type = Column(String, nullable=False)
    entity_id = Column(Integer, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    admin_id = Column(Integer, ForeignKey("admins.id"), nullable=True)
    details = Column(JSON, nullable=False)
    timestamp = Column(DateTime, default=datetime.now)

    # Relationships
    user = relationship("User", back_populates="audit_logs")
    admin = relationship("Admin", back_populates="audit_logs")

# Admin
class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    permissions = Column(JSON, nullable=False)
    role = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    last_login = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    reset_tokens = relationship("ResetToken", back_populates="admin")
    audit_logs = relationship("AuditLog", back_populates="admin")
    admin_settings = relationship("AdminSetting", backref="admin")

# AdminSetting
class AdminSetting(Base):
    __tablename__ = "admin_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, nullable=False)
    value = Column(JSON, nullable=False)
    description = Column(String, nullable=True)
    updated_by = Column(Integer, ForeignKey("admins.id"), nullable=False)
    updated_at = Column(DateTime, default=datetime.now)