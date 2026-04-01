import pytest
from fastapi import status

from App import app
from Schemas.Authentication import TokenData

from Tests.conftest import client, session
from Utils.oauth2 import get_current_user, oauth2_scheme


def mock_current_user():
    return TokenData(username="exist")

@pytest.mark.parametrize(
    "test_data, expected_response, status_code",
    [
        (10,
         {
             "completed": True,
             "todo_name": "test",
             "description": "This is a test",
             "todo_id": 10,
             "creator_username": "exist"
         },
         status.HTTP_200_OK),
        (1,
         {'detail': "Todo with id: 1 doesn't exist"},
         status.HTTP_404_NOT_FOUND)
    ])
def test_get_todo_by_id(session, test_data, expected_response, status_code):
    app.dependency_overrides[get_current_user] = mock_current_user

    response = client.get(f"/todos/{test_data}")
    assert response.status_code == status_code
    assert response.json() == expected_response


@pytest.mark.parametrize(
    "test_data, expected_response, status_code",
    [
        (10,
         None,
         status.HTTP_204_NO_CONTENT),
        (1,
         {'detail': "Todo with id: 1 doesn't exist"},
         status.HTTP_404_NOT_FOUND)
    ])
def test_delete_todo_by_id(session, test_data, expected_response, status_code):
    app.dependency_overrides[get_current_user] = mock_current_user

    response = client.delete(f"/todos/{test_data}")
    assert response.status_code == status_code
    if response.text != "":
        assert response.json() == expected_response


