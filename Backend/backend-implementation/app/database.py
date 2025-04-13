import os 
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_USER = os.getenv("DB_USER","postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD","postgres")
#DB_HOST = os.getenv("DB_HOST","localhost")
DB_HOST = os.getenv("DB_HOST", "pcbuilder-postgres")
DB_PORT = os.getenv("DB_PORT","5432")
DB_NAME = os.getenv("DB_NAME","pcbuilder")

# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/pcbuilder"
SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

print("Connecting to DB:", SQLALCHEMY_DATABASE_URL)

#create engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

#create session local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#create base class
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()