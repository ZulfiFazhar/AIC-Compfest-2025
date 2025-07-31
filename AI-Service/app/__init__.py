from flask import Flask
from .routes import api as api_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.core.config.Config')

    # Register blueprints
    app.register_blueprint(api_blueprint, url_prefix='/api')

    return app
