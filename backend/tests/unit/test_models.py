from datetime import date

import pytest

from app.models import User


def test_user_model(app_with_db):
    with app_with_db.app_context():
        user = User(
            "Ivan Gerov", date(1996, 11, 11), "igerov11@gmaiaal.com", 20
        ).create()
        users_query = User.query.all()
    user1 = users_query[0]
    assert user1.name == "Ivan Gerov"
    assert user1.date_of_birth == date(1996, 11, 11)
    assert user1.email == "igerov11@gmaiaal.com"
    assert user1.number_of_children == 20