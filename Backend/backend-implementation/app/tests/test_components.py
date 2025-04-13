from fastapi.testclient import TestClient
from app.main import app  # adjust if your app entrypoint is in a different path

client = TestClient(app)

def test_get_components():
    response = client.get("/api/v1/components/")
    assert response.status_code == 200
    assert "items" in response.json()

def test_create_component():
    test_data = {
        "name": "Test GPU",
        "category": "GPU",
        "brand": "TestBrand",
        "model": "TB1000",
        "price": 299.99,
        "specs": {
            "core_clock": 1600,
            "boost_clock": 1900,
            "memory": "8GB",
            "tdp": 150
        },
        "image_url": None,
        "in_stock": True
    }

    response = client.post("/api/v1/components/", json=test_data)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["component"]["name"] == "Test GPU"