import os

# from dotenv import dotenv_values

# # This will break for non venv users
# WORKSPACE_ROOT = os.path.sep.join(os.getenv("VIRTUAL_ENV").split(os.path.sep)[:-1])
# ENV_CONFIG_FILE = dotenv_values(f"{WORKSPACE_ROOT}/.development_env")


class Config:
    """Base config object"""

    DEBUG = False
    DEVELOPMENT = False
    SECRET_KEY = os.getenv("SECRET_KEY", "this-is-the-default-key")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "")


class DevelopmentConfig(Config):
    """Development config object"""

    DEBUG = True
    DEVELOPMENT = True


class TestingConfig(Config):
    """Testing config object"""

    TESTING = True
