from ast import dump
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, post_load


db = SQLAlchemy()


class User(db.Model):
    """User model"""

    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    name = db.Column(db.String(255))
    date_of_birth = db.Column(db.Date)
    email = db.Column(db.String)
    number_of_children = db.Column(db.Integer)

    def __init__(self, name, date_of_birth, email, number_of_children):
        self.name = name
        self.date_of_birth = date_of_birth
        self.email = email
        self.number_of_children = number_of_children

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __repr__(self):
        return "\n".join(
            [
                f"User: {self.id}",
                f"Created at: {self.created_at}",
                f"Name: {self.name}",
                f"Date of Birth: {self.date_of_birth}",
                f"Email: {self.email}",
                f"Number of Children: {self.number_of_children}",
            ]
        )


class UserSchema(Schema):
    """User schema"""

    class Meta:
        model = User
        sqla_session = db.session

    id = fields.Integer(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    name = fields.String(required=True)
    date_of_birth = fields.DateTime(required=True, format="%Y-%m-%d")
    email = fields.String(required=True)
    number_of_children = fields.Integer(required=True)

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)
