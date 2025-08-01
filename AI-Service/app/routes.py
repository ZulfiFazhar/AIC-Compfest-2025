from flask import Blueprint, request, jsonify, current_app
from .services.detection_service import detect_objects_async, model
from .utils.image_processing import allowed_file
import asyncio

api = Blueprint('api', __name__)

@api.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify service status."""
    try:
        status = {
            "status": "healthy",
            "service": "AI Detection Service",
            "model_loaded": model is not None
        }
        return jsonify(status), 200
    except Exception as e:
        current_app.logger.error(f"Health check failed: {e}")
        return jsonify({"status": "unhealthy", "error": str(e)}), 500

@api.route('/detect', methods=['POST'])
async def detect_objects():
    if 'image' not in request.files:
        return jsonify({"error": "No image part in the request"}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({"error": "No selected image"}), 400
    
    if file and allowed_file(file.filename):
        try:
            # Read image data
            image_data = file.read()
            
            # Run detection asynchronously
            results = await detect_objects_async(image_data)
            
            return jsonify({"status": "success", "detections": results})
        except Exception as e:
            current_app.logger.error(f"Error during object detection: {e}")
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid file type"}), 400
