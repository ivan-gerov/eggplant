from datetime import date

import pytest

from app.app import create_app
from app.config import TestingConfig
from app.models import User


@pytest.fixture
def app_with_db(tmpdir):
    test_config = TestingConfig()
    test_config.SQLALCHEMY_DATABASE_URI = f"sqlite:///{tmpdir}/test.db"
    app = create_app(config=test_config)
    yield app


@pytest.fixture
def client(app_with_db):
    with app_with_db.test_client() as client:
        yield client


@pytest.fixture
def create_user(app_with_db):
    with app_with_db.app_context():
        user = User(
            "Ivan Gerov", date(1996, 11, 11), "igerov11@gmaiaal.com", 20
        ).create()
