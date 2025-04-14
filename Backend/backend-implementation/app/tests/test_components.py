# from fastapi.testclient import TestClient
# from app.main import app  # adjust if your app entrypoint is in a different path

# client = TestClient(app)

# def test_get_all_components():
#     response = client.get("/api/v1/components/")
#     assert response.status_code == 200
#     assert "items" in response.json()

# def test_create_component():
#     test_data = {
#         "name": "Test GPU",
#         "category": "GPU",
#         "brand": "TestBrand",
#         "model": "TB1000",
#         "price": 299.99,
#         "specs": {
#             "core_clock": 1600,
#             "boost_clock": 1900,
#             "memory": "8GB",
#             "tdp": 150
#         },
#         "image_url": None,
#         "in_stock": True
#     }

#     response = client.post("/api/v1/components/", json=test_data)
#     assert response.status_code == 201
#     data = response.json()
#     assert data["success"] is True
#     assert data["component"]["name"] == "Test GPU"


from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_all_components():
    response = client.get("/api/v1/components/")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert isinstance(data["items"], list)

def test_create_component():
    global created_component_id  # if needed for future delete testing
    test_data = {
        "name": "Test CPU",
        "category": "CPU",
        "brand": "TestBrand",
        "model": "TB2000",
        "price": 199.99,
        "specs": {
            "cores": 8,
            "threads": 16,
            "base_clock": "3.5 GHz",
            "boost_clock": "4.8 GHz",
            "socket": "LGA1700",
            "tdp": 95
        },
        "image_url": None,
        "in_stock": True
    }

    response = client.post("/api/v1/components/", json=test_data)
    assert response.status_code == 201
    json = response.json()
    assert json["success"] is True
    assert json["component"]["name"] == "Test CPU"
    global_component_id = json["component"]["id"]  # Save ID if needed later

def test_get_component_by_id():
    # Create a component first
    post_response = client.post("/api/v1/components/", json={
        "name": "Lookup GPU",
        "category": "GPU",
        "brand": "SampleBrand",
        "model": "SB-100",
        "price": 299.99,
        "specs": {
            "core_clock": 1600,
            "boost_clock": 1800,
            "memory": "8GB",
            "tdp": 150
        },
        "image_url": None,
        "in_stock": True
    })
    assert post_response.status_code == 201
    component_id = post_response.json()["component"]["id"]

    get_response = client.get(f"/api/v1/components/{component_id}")
    assert get_response.status_code == 200
    assert get_response.json()["model"] == "SB-100"

def test_update_component():
    # Create a component first
    post_response = client.post("/api/v1/components/", json={
        "name": "Old RAM",
        "category": "RAM",
        "brand": "MemoryCo",
        "model": "DDR4-3200",
        "price": 79.99,
        "specs": {
            "memory": "16GB",
            "speed": "3200MHz"
        },
        "image_url": None,
        "in_stock": True
    })
    assert post_response.status_code == 201
    comp_id = post_response.json()["component"]["id"]

    updated_data = {
        "name": "New RAM",
        "category": "RAM",
        "brand": "MemoryCo",
        "model": "DDR4-3600",
        "price": 89.99,
        "specs": {
            "memory": "16GB",
            "speed": "3600MHz"
        },
        "image_url": None,
        "in_stock": True
    }

    put_response = client.put(f"/api/v1/components/{comp_id}", json=updated_data)
    assert put_response.status_code == 200
    updated = put_response.json()["component"]
    assert updated["name"] == "New RAM"
    assert updated["model"] == "DDR4-3600"


