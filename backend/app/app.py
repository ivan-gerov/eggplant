from flask import Flask
from flask_cors import CORS
from app.models import db
from app.api import api
from app import config


def create_app():
    app = Flask(__name__)
    app.config.from_object(config.Config)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["CORS_HEADERS"] = "Content-Type"
    CORS(app)
    app.register_blueprint(api)
    with app.app_context():
        db.init_app(app)
        db.create_all(app=app)
    return app
