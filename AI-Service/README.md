# Object Detection API

## Project Description

This project is a RESTful API for object detection using the YOLOv8 model. The application is built with Flask and allows users to upload images, after which the API will return the detected objects found in the image.

## Features

- **Asynchronous Object Detection**: Utilizes the YOLOv8 model for asynchronous object detection.
- **Image Validation**: Ensures that only allowed image file types can be uploaded.
- **Simple API**: An easy-to-use API interface for uploading images and getting detection results.

## Technologies

- **Flask**: A micro web framework for building APIs.
- **ultralytics**: A library for using YOLO (You Only Look Once) models like YOLOv8.
- **Werkzeug**: A comprehensive WSGI utility library.
- **aiohttp**: (Optional, if used for external requests) An asynchronous HTTP client/server library.
- **asyncio**: Python's built-in library for writing concurrent code using async/await syntax.

## Installation

Follow these steps to set up and run this project in your local environment.

### 1. Clone the Repository

```bash
git clone https://github.com/ZulfiFazhar/Model-AIC-Compfest-2025
cd Model-AIC-Compfest-2025
```

### 2. Create and Activate a Virtual Environment

It is recommended to use a virtual environment to manage project dependencies.

```bash
python -m venv venv

# For Windows
.\venv\Scripts\activate

# For macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

Install all required libraries from `requirements.txt`.

```bash
pip install -r requirements.txt
```

### 4. Download YOLOv8 Model

The YOLOv8 model (`yolov8n.pt`) needs to be placed in the `app/models/` directory. You can download it from the Ultralytics repository or other trusted sources.

```bash
# Example command to download the model (you might need to adjust it)
# Make sure you have curl or wget installed
# curl -L https://github.com/ultralytics/assets/releases/download/v8.0.0/yolov8n.pt -o app/models/yolov8n.pt
# Or download manually and place it in app/models/
```

Ensure the `yolov8n.pt` file is present in `app/models/`.

## Usage

### Running the Application

After installation, you can run the Flask application:

```bash
python app.py
```

The application will run on `http://0.0.0.0:5000` by default.

### API Endpoints

#### `POST /detect`

This endpoint is used to upload an image and perform object detection.

- **Method**: `POST`
- **Header**: `Content-Type: multipart/form-data`
- **Body**:
  - `image`: The image file to be detected.

**Example Request (using `curl`)**:

```bash
curl -X POST -F "image=@/path/to/your/image.jpg" http://localhost:5000/detect
```

_(Replace `/path/to/your/image.jpg` with the path to your image)_

**Example Success Response**:

```json
{
    "status": "success",
    "detections": [
        {
            "box": [x1, y1, x2, y2],
            "confidence": 0.95,
            "class": "person"
        },
        {
            "box": [x1, y1, x2, y2],
            "confidence": 0.88,
            "class": "car"
        }
    ]
}
```

**Example Error Response**:

```json
{
  "error": "No image part in the request"
}
```

or

```json
{
  "error": "Invalid file type"
}
```

## Project Structure

```
.
├── .gitignore
├── app.py                  # Main application entry point
├── requirements.txt        # List of Python dependencies
├── notebooks/              # Folder for experiments and data exploration (contains .ipynb files)
├── app/
│   ├── __init__.py         # Flask application initialization
│   ├── core/
│   │   └── config.py       # Application configuration
│   ├── routes.py           # API endpoint definitions
│   ├── models/             # Directory for object detection models (e.g., yolov8n.pt)
│   ├── services/
│   │   ├── __init__.py
│   │   └── detection_service.py # Object detection logic
│   └── utils/
│       ├── __init__.py
│       └── image_processing.py  # Image processing utilities
└── tests/
    ├── __init__.py
    └── test_api.py         # Unit tests for the API
```

## Configuration

The `app/core/config.py` file contains important configurations for the application:

- `MODEL_PATH`: Absolute path to the object detection model (default: `app/models/yolov8n.pt`).
- `ALLOWED_EXTENSIONS`: Allowed image file extensions for upload (default: `{'png', 'jpg', 'jpeg', 'gif'}`).
- `MAX_CONTENT_LENGTH`: Maximum allowed file size for uploads (default: 16 MB).

You can modify these values as needed.

## Testing

To run unit tests, navigate to the project root directory and execute:

```bash
python -m unittest discover tests
```

## Contributing

Contributions are highly appreciated! If you'd like to contribute, please follow these steps:

1.  Fork this repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Ensure all tests pass.
5.  Commit your changes (`git commit -m 'Add new feature'`).
6.  Push to your branch (`git push origin feature/your-feature-name`).
7.  Create a Pull Request.

## License

This project is licensed under the [Your License Name, e.g., MIT License]. See the `LICENSE` file for more details.
