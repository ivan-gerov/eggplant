import json

import pytest


def test_get_user(client, create_user):
    """Test GET endpoint"""
    response = client.get("/api/v1/user")
    assert response.status_code == 200
    user_data = json.loads(response.data)[0]
    assert user_data["name"] == "Ivan Gerov"
    assert user_data["date_of_birth"] == "1996-11-11"
    assert user_data["email"] == "igerov11@gmaiaal.com"
    assert user_data["number_of_children"] == 20


def test_post_user(client):
    """Test POST endpoint"""
    user_data = {
        "name": "Joe Rogan",
        "date_of_birth": "1960-05-03",
        "email": "joe_rogan@dmt.com",
        "number_of_children": 3,
    }
    post_response = client.post("/api/v1/user", json=user_data)
    assert post_response.status_code == 200

    get_user_data_response = client.get("/api/v1/user")
    assert get_user_data_response.status_code == 200
    get_user_data = json.loads(get_user_data_response.data)[0]
    assert get_user_data["name"] == user_data["name"]
    assert get_user_data["date_of_birth"] == user_data["date_of_birth"]
    assert get_user_data["email"] == user_data["email"]
    assert get_user_data["number_of_children"] == user_data["number_of_children"]
