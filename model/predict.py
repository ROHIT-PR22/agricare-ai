import numpy as np
from PIL import Image
import os
import random

# Mapping output index to disease names
CLASSES = [
    "Tomato Early Blight",
    "Tomato Late Blight",
    "Tomato Leaf Mold",
    "Potato Early Blight",
    "Potato Late Blight",
    "Corn Common Rust",
    "Corn Northern Leaf Blight",
    "Healthy Leaf"
]

def load_custom_model(model_path="agricare_model.h5"):
    if os.path.exists(model_path):
        import tensorflow as tf
        return tf.keras.models.load_model(model_path)
    return None

def predict_disease(image_path):
    """
    Simulates model prediction if actual model is not trained yet.
    If 'agricare_model.h5' exists, it will use it.
    """
    model = load_custom_model()
    
    if model:
        # Actual prediction
        import tensorflow as tf
        img = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0) # Create a batch
        img_array /= 255.0 # Normalize

        predictions = model.predict(img_array)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]))
        
        disease = CLASSES[predicted_class_idx]
    else:
        # Mock prediction for demonstration
        # Simulate processing time
        import time
        time.sleep(1)
        disease = random.choice(CLASSES)
        confidence = random.uniform(0.85, 0.99)
        
    return disease, confidence
