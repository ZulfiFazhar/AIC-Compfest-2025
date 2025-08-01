import os

class Config:
    # Path to your object detection model
    MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app', 'models', 'yolov8n.pt')
    # Allowed image extensions for upload
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    # Max content length for uploaded files (e.g., 16 MB)
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    # Other configurations can go here
