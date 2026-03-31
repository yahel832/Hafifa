from Tests.conftest import client
from Utils.auth import get_password_hash


def test_create_user():
    test_data = {"username": "yahel", "email": "yahel", "password": "yahel"}
    response = client.post("/users/", json=test_data)
    assert response.status_code == 201
    expected_response = {"username": "yahel", "email": "yahel", "password": get_password_hash("yahel")}
    assert response.json() == expected_response