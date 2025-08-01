from flask import Blueprint, request, jsonify, current_app
import asyncio

api = Blueprint('api', __name__)

@api.route('/health', methods=['GET'])
def health_check():
    try:
        status = {
            "status": "healthy",
            "service": "AI Detection Service",
        }
        return jsonify(status), 200
    except Exception as e:
        current_app.logger.error(f"Health check failed: {e}")
        return jsonify({"status": "unhealthy", "error": str(e)}), 500
