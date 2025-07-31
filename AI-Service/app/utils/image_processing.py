from flask import current_app

def allowed_file(filename):
    """Checks if the uploaded file has an allowed extension."""
    return '.' in filename and            filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

# You can add more image processing utility functions here, e.g.,
# def preprocess_image(image):
#     # Resize, normalize, etc.
#     pass


