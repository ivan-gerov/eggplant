from typing import Iterable

from flask import Blueprint, jsonify, request
from flask.helpers import make_response

from app.models import User, UserSchema, db

api = Blueprint("api", __name__)


def serialize_models(model: db.Model = None, models: Iterable[db.Model] = None):
    """Serializes a model or a set of models"""
    if model:
        models = [model]
    user_schema = UserSchema(many=True)
    return user_schema.dump(models)


@api.route("/api/v1/user", methods=["GET"])
def list_users():
    """Returns a list of all users"""
    users = User.query.all()
    serialized_users = serialize_models(models=users)
    import json

    with open("sample_data.json", "w") as f:
        f.write(json.dumps(serialized_users))
    return make_response(jsonify(serialized_users))


@api.route("/api/v1/user", methods=["POST"])
def add_user():
    """Adds a new user to the database and returns it back"""
    user_data = request.get_json()
    user_schema = UserSchema()
    user = user_schema.load(user_data).create()
    serialized_user = serialize_models(model=user)
    return make_response(jsonify({"user": serialized_user}))
