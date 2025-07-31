import asyncio
import torch
from ultralytics import YOLO
import io
from PIL import Image
import numpy as np
import os
from flask import current_app

# Global variable to store the model
model = None

async def load_model_async():
    """Loads the YOLO model asynchronously."""
    global model
    if model is None:
        model_path = current_app.config['MODEL_PATH']
        if not os.path.exists(model_path):
            current_app.logger.error(f"Model file not found at: {model_path}")
            raise FileNotFoundError(f"Model file not found at: {model_path}")
        
        current_app.logger.info(f"Loading model from {model_path}...")
        # Use asyncio.to_thread to run the blocking model loading in a separate thread
        model = await asyncio.to_thread(YOLO, model_path)
        current_app.logger.info("Model loaded successfully.")
    return model

async def detect_objects_async(image_data: bytes):
    """
    Performs object detection on the given image data asynchronously.
    """
    # Ensure model is loaded
    yolo_model = await load_model_async()

    # Convert image data to PIL Image
    image = Image.open(io.BytesIO(image_data)).convert("RGB")
    
    # Perform inference (this is a blocking call, so run in a thread)
    # The 'stream=True' argument might be useful for larger models or real-time scenarios
    results = await asyncio.to_thread(yolo_model, image)

    # Process results
    detections = []
    for r in results:
        boxes = r.boxes  # Boxes object for bbox outputs
        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            confidence = round(box.conf[0].item(), 2)
            class_id = int(box.cls[0].item())
            class_name = yolo_model.names[class_id]
            
            detections.append({
                "box": [x1, y1, x2, y2],
                "confidence": confidence,
                "class": class_name
            })
    return detections
