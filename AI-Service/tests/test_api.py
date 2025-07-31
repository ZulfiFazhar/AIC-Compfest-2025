import pytest
from app import create_app
import os

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    # Use a dummy model path for testing
    app.config['MODEL_PATH'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dummy_model.pt')
    with app.test_client() as client:
        yield client

# Create a dummy model file for testing purposes
@pytest.fixture(autouse=True)
def setup_dummy_model(client):
    dummy_model_path = client.application.config['MODEL_PATH']
    # Create a dummy file to simulate the model
    with open(dummy_model_path, 'w') as f:
        f.write("dummy model content")
    yield
    # Clean up the dummy file after tests
    os.remove(dummy_model_path)

def test_detect_no_image(client):
    response = client.post('/api/detect')
    assert response.status_code == 400
    assert "No image part in the request" in response.json['error']

def test_detect_empty_filename(client):
    data = {'image': (b'', '')}
    response = client.post('/api/detect', data=data, content_type='multipart/form-data')
    assert response.status_code == 400
    assert "No selected image" in response.json['error']

def test_detect_invalid_file_type(client):
    data = {'image': (b'some_data', 'test.txt')}
    response = client.post('/api/detect', data=data, content_type='multipart/form-data')
    assert response.status_code == 400
    assert "Invalid file type" in response.json['error']

# Note: A full integration test for detection_service.py would require
# a mock for the YOLO model or a small, actual model.
# For now, we'll test the Flask routing and file handling.
