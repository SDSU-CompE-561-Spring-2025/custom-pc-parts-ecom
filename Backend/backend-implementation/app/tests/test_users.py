from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

TEST_USERNAME = "testuser"
TEST_EMAIL = "test@example.com"
TEST_PASSWORD = "testpass123"

def test_user_flow():
    # Step 1: Register user
    register_response = client.post("/api/v1/users/", json={
        "username": TEST_USERNAME,
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    })
    assert register_response.status_code in [200, 400]

    # Step 2: Login
    login_response = client.post("/api/v1/users/token", data={
        "username": TEST_EMAIL,
        "password": TEST_PASSWORD
    })
    assert login_response.status_code == 200
    token = login_response.json()["access_token"]

    # Step 3: Access protected route
    headers = {"Authorization": f"Bearer {token}"}
    me_response = client.get("/api/v1/users/me", headers=headers)
    assert me_response.status_code == 200
    assert me_response.json()["user"]["email"] == TEST_EMAIL