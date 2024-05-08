import tensorflow as tf
from keras.models import load_model
import numpy as np

# model = load_model('/Users/adelayoadebiyi/Documents/GitHub/iteration-one/lcai-v1/public/ai_models/face_recog/emotionscanner.keras')
# Frames sent from front-end. React webcam captures the users face and these frames are sent here
def process_image():
    # image = tf.keras.preprocessing.image.load_img(image_file, target_size=(48, 48), color_mode='grayscale')
    
    # Convert PIL image to numpy array
    image_array = tf.keras.preprocessing.image.img_to_array(image)
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

    # Normalize the image data
    image_array /= 255.0

    # Make prediction
    predictions = model.predict(image_array)
    predicted_class = np.argmax(predictions, axis=1)  
    
    class_names = ["anger", "disgust", "happiness", "neutral", "sadness", "surprise"]
    predicted_class_name = class_names[predicted_class[0]]
    
    return predicted_class_name

