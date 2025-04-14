import json
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError
from app.database import SessionLocal, Base, engine
from app.models import User, Component, Build, BuildComponent, Review
from app.auth import get_password_hash

# Initialize database
Base.metadata.create_all(bind=engine)

def load_json(file_name):
    with open(f"seed_data/{file_name}", "r") as f:
        return json.load(f)

def seed_database():
    db = SessionLocal()
    try:
        #Seed Users 
        users_data = load_json("users.json")
        users = []
        for u in users_data:
            user = User(
                username=u["username"],
                email=u["email"],
                hashed_password=get_password_hash(u["password"]),
                is_active=u.get("is_active", True),
                is_admin=u.get("is_admin", False),
                email_verified=u.get("email_verified", True),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            db.add(user)
            users.append(user)
        db.commit()
        for user in users:
            db.refresh(user)

        #Seed Components
        component_files = [
            ("cpu.json", "CPU"),
            ("cpu-cooler.json", "Cooler"),
            ("motherboard.json", "Motherboard"),
            ("memory.json", "RAM"),
            ("storage.json", "Storage"),
            ("videocard.json", "GPU"),
            ("case.json", "Case"),
            ("powersupply.json", "PSU"),
            ("operatingsystem.json", "OS"),
            ("monitor.json", "Monitor"),
        ]

        components = []
        for filename, category in component_files:
            comp_data = load_json(filename)
            for item in comp_data:
                component = Component(
                    name=item["name"],
                    category=category,
                    brand=item.get("brand", "Generic"),
                    model=item.get("model", item["name"][:15]),
                    price=item["price"] if item["price"] is not None else 0,
                    specs={k: v for k, v in item.items() if k not in ["name", "price"]},
                    in_stock=True,
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow(),
                )
                db.add(component)
                components.append(component)
        db.commit()
        for component in components:
            db.refresh(component)

        # Seed Builds 
        builds_data = load_json("builds.json")
        for b in builds_data:
            build = Build(
                user_id=b["user_id"],
                name=b["name"],
                description=b.get("description"),
                is_public=b.get("is_public", True),
                total_price=b.get("total_price"),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            db.add(build)
            db.commit()
            db.refresh(build)
            for comp in b["components"]:
                bc = BuildComponent(
                    build_id=build.id,
                    component_id=comp["component_id"],
                    quantity=comp.get("quantity", 1),
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow(),
                )
                db.add(bc)
            db.commit()

        # Seed Reviews 
        reviews_data = load_json("reviews.json")
        for r in reviews_data:
            review = Review(
                user_id=r["user_id"],
                component_id=r["component_id"],
                rating=r["rating"],
                title=r.get("title"),
                content=r.get("content"),
                verified=r.get("verified", True),
                status=r.get("status", "approved"),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            db.add(review)
        db.commit()

        print("Database seeded successfully!")

    except SQLAlchemyError as e:
        print(f"Database error: {e}")
        db.rollback()
    except Exception as e:
        print(f"Unexpected error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Seeding data...")
    seed_database()
