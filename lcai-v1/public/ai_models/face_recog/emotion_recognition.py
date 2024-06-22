import cv2
import numpy as np
import tensorflow as tf
from keras.models import load_model

# Load trained model for FER
model = load_model('/Users/adelayoadebiyi/Documents/GitHub/iteration-one/lcai-v1/public/ai_models/face_recog/originalemotionrecogniser.keras')

emotion_classes = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

# Source: https://www.geeksforgeeks.org/extract-video-frames-from-webcam-and-save-to-images-using-python/
# Initialize the webcam
cap = cv2.VideoCapture(0)
# Load OpenCV face detector for bounding boxes
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')





def preprocess_face(face):
    # Source: https://pyimagesearch.com/2021/04/28/opencv-color-spaces-cv2-cvtcolor/
    # Convert face image to grayscale as the model takes grayscale images
    gray = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
    
    # Source: https://stackoverflow.com/questions/4195453/how-to-resize-an-image-with-opencv2-0-and-python2-6
    # Resize rayscale image to 48x48 pixels (input size for my model)
    resized_face = cv2.resize(gray, (48, 48))
    
    # Source: https://blog.finxter.com/5-best-ways-to-normalize-an-image-in-opencv-python/
    # Normalize pixel values to the range [0, 1] for efficiency and preprocessing
    normalized_face = resized_face / 255.0
    
    # Source: https://keras.io/api/models/model/#fit-method see input_shape method on CNN
    # Source: https://stackoverflow.com/questions/62991248/how-can-i-solve-the-input-shape-issue-in-cnn  Solving the input shape error 
    # Source: https://numpy.org/doc/stable/reference/generated/numpy.reshape.html
    # Reshape image to match input shape and dimensions required by the model (1, 48, 48, 1) otherwise an error occurs
    # 1 image processed at a time (batch size), 48x48 height and width, 1 channel for grayscale image
    reshaped_face = np.reshape(normalized_face, (1, 48, 48, 1))
    
    # Return preprocessed face image
    return reshaped_face

# Source: https://www.geeksforgeeks.org/extract-video-frames-from-webcam-and-save-to-images-using-python/
while True:
    # Capture frame-by-frame
    # ret or return indicates whether frame has been captured successfully from the webcam (boolean value)
    # if ret is true, the frame is stored in frame variable (it is the image frame when ret is true)
    ret, frame = cap.read()
    # if webcam not working then break
    if not ret:
        break

    # Source: https://pyimagesearch.com/2021/04/28/opencv-color-spaces-cv2-cvtcolor/
    # Convert face image to grayscale as the model takes grayscale images
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        # Extract the face 
        face_roi = frame[y:y+h, x:x+w]

        # Preprocess the face
        preprocessed_face = preprocess_face(face_roi)

        # Make prediction using model
        prediction = model.predict(preprocessed_face)
        emotion_index = np.argmax(prediction)
        emotion_label = emotion_classes[emotion_index]

        # Draw rectangle around  face and label the emotion
        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
        cv2.putText(frame, emotion_label, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

    # Source: https://www.geeksforgeeks.org/python-opencv-cv2-imshow-method/
    # Displayr resulting frame
    cv2.imshow('Emotion Recognition', frame)

    # Source: https://stackoverflow.com/questions/70238244/how-to-end-a-while-loop-by-pressing-a-key
    # quit on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Source: https://www.geeksforgeeks.org/extract-video-frames-from-webcam-and-save-to-images-using-python/
# When quitting stop webcam and destroy all windows
cap.release()
cv2.destroyAllWindows()
