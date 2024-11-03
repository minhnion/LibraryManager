from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from celery import Celery
from config import Config
from flask_mail import Mail

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
mail = Mail()
celery = Celery(__name__, broker=Config.CELERY_BROKER_URL)


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    mail.init_app(app)
    
    celery.conf.update(app.config)
    
    from .controllers.reader import reader_api
    app.register_blueprint(reader_api, url_prefix="/reader")
    
    from .controllers.admin import admin_api
    app.register_blueprint(admin_api, url_prefix="/admin")

    return app