import pytest
from fastapi import status

from Tests.conftest import client, session

@pytest.mark.parametrize(
    "test_data, expected_response, status_code",
    [
        ({"username": "yahel", "email": "yahel", "password": "yahel"},
         {"username": "yahel", "email": "yahel"},
         status.HTTP_201_CREATED),
        ({"username": "exist", "email": "exist", "password": "exist"},
         {"detail": "User with that username already exists"},
         status.HTTP_409_CONFLICT),
    ])
def test_create_user(session, test_data, expected_response, status_code):
    response = client.post("/users/", json=test_data)
    assert response.status_code == status_code
    assert response.json() == expected_response