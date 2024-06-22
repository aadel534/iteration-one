# Import necessary libraries
import glob as glob  # For file pattern matching
import os  # For interacting with the operating system
import tensorflow as tf  # For deep learning tasks
from keras import layers, models  # For building neural network models
from pathlib import Path  # For handling file paths
import time  # For time-related functions
import keras  # High-level neural networks API

# training and testing datasets
path_test = "/Users/adelayoadebiyi/Documents/GitHub/iteration-one/lcai-v1/public/datasets/emotions/test"
path_train = "/Users/adelayoadebiyi/Documents/GitHub/iteration-one/lcai-v1/public/datasets/emotions/train"

# Creating Path objects for training and testing datasets
# Source: https://martinxpn.medium.com/pathlib-the-oop-approach-of-working-with-file-system-in-python-65-100-days-of-python-7dbf85e9cec2#:~:text=Creating%20Path%20Objects%20With%20pathlib,based%20on%20the%20operating%20system.
data_dir = Path(path_train) 
test_data_dir = Path(path_test)

# Set image size and batch size for training
batch_size = 64
img_height = 48
img_width = 48

# Improve performance when using images 
# Source: https://www.tensorflow.org/tutorials/load_data/images
AUTOTUNE = tf.data.AUTOTUNE

# Keep image size consistent
# Source: https://www.tensorflow.org/tutorials/load_data/images
IMG_SIZE = 48
resize_and_rescale = tf.keras.Sequential([
  layers.Resizing(IMG_SIZE, IMG_SIZE),
  layers.Rescaling(1./255)
])

# Load training dataset with image dataset utility
# Source: https://www.tensorflow.org/tutorials/load_data/images
train_ds = tf.keras.utils.image_dataset_from_directory(
  data_dir,
  validation_split=0.2,
  subset="training",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size,
  color_mode="grayscale"
)

# Load validation dataset with image dataset utility
val_ds = tf.keras.utils.image_dataset_from_directory(
  data_dir,
  validation_split=0.2,
  subset="validation",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size,
  color_mode="grayscale"
)

# Load testing dataset with image dataset utility
test_ds = tf.keras.utils.image_dataset_from_directory(
    test_data_dir,
    shuffle=True,
    batch_size=batch_size,
    image_size=(img_height, img_width),
    color_mode="grayscale"
)

# Retrieve class names from the training dataset
class_names = train_ds.class_names
print(class_names)

# Normalize pixel values to the range [0, 1]
# Source: https://www.tensorflow.org/tutorials/load_data/images
normalization_layer = tf.keras.layers.Rescaling(1./255)
normalized_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))

# Improve performance by caching and prefetching data
# Source: https://www.tensorflow.org/tutorials/load_data/images
train_ds = train_ds.cache().prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

# Data augmentation to improve model robustness
data_augmentation = tf.keras.Sequential([
    layers.RandomRotation(0.1),
    layers.RandomContrast(0.1),
    layers.RandomBrightness(factor=0.1)
])

# Function to prepare datasets with optional shuffling and augmentation
def prepare(ds, shuffle=False, augment=False):
  # Resize and rescale all datasets
  ds = ds.map(lambda x, y: (resize_and_rescale(x), y), 
              num_parallel_calls=AUTOTUNE)
  
  # Apply data augmentation if specified
  if augment:
      ds = ds.map(lambda x, y: (data_augmentation(x, training=True), y),
                  num_parallel_calls=AUTOTUNE)

  # Shuffle the dataset if specified
  if shuffle:
    ds = ds.shuffle(1000)

  # Use buffered prefetching on all datasets
  return ds.prefetch(buffer_size=AUTOTUNE)

# Prepare and preprocess datasets
train_ds = prepare(train_ds, shuffle=True, augment=False) 
val_ds = prepare(val_ds)
test_ds = prepare(test_ds)

# Define the neural network model
model = tf.keras.Sequential([
    layers.Conv2D(16, 3, padding='same', activation='elu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, 3, padding='same', activation='elu'),
    layers.MaxPooling2D((2, 2)),
    layers.Dense(256, activation='elu'),
    layers.Conv2D(128, 3, padding='same', activation='elu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(7)
])

# Compile the model with optimizer and loss function
model.compile(optimizer='RMSprop',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

# Train the model for a specified number of epochs
epochs = 50
history = model.fit(
  train_ds,
  validation_data=val_ds,
  epochs=epochs
)

# Evaluate the model on the test dataset
loss, acc = model.evaluate(test_ds)
print("Accuracy", acc)
print("Test Loss:", loss)


# Explanation of metrics
# Accuracy is the total accuracy for all the predictions made so far as a percentage
# Loss is the difference between the prediction and actual value (for every instance that the algorithm has run so far) as a percentage
# Val_Loss is the difference between the prediction and the actual value for each instance of unseen data going through the algorithm during training
# Val_Accuracy is the accuracy per instance

# Save the trained model
keras.saving.save_model(model, 'originalemotionrecogniser.keras')
