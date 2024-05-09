import tensorflow as tf
from keras.models import load_model
import numpy as np
from PIL import Image
import io

model_path = '/Users/adelayoadebiyi/Documents/GitHub/iteration-one/lcai-v1/public/ai_models/face_recog/emotionscanner.keras'
model = load_model(model_path)


# model = load_model('/Users/adelayoadebiyi/Documents/GitHub/iteration-one/lcai-v1/public/ai_models/face_recog/emotionscanner.keras')
# Frames sent from front-end. React webcam captures the users face and these frames are sent here
def process_image(image_file):

    image_bytes = io.BytesIO(image_file.read())
    image = Image.open(image_bytes).convert('L')
    image = image.resize((48, 48))

    image_array = np.expand_dims(np.array(image), axis=0)

    image_array = image_array.astype('float32') / 255.0

    predictions = model.predict(image_array)
    predicted_class = np.argmax(predictions, axis=1)

    class_names = ["anger", "disgust", "happiness", "neutral", "sadness", "surprise"]
    predictedEmotion = class_names[predicted_class[0]]
    return predictedEmotion