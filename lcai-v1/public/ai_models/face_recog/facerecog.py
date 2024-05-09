
#Search for files (pattern matching) using glob
import glob as glob
import os
import tensorflow as tf
from keras import layers, models
from pathlib import Path
import time
import keras



path_test = "/Users/adelayoadebiyi/Documents/GitHub/iteration-one/lcai-v1/public/datasets/test"
path_train = "/Users/adelayoadebiyi/Documents/GitHub/iteration-one/lcai-v1/public/datasets/train"

# Remove .DS_Store files
def deleteDStoreFile(file):
    # Source: https://blog.boot.dev/python/file-exists-python/
    if file.exists():
    # Source: https://blog.enterprisedna.co/delete-files-from-python/#:~:text=Using%20pathlib%2C%20you%20can%20delete,method%20to%20remove%20the%20file.
        file.unlink()
ds_store_file_1 = Path("../datasets/train/angry/.DS_Store")
ds_store_file_2 = Path("../datasets/train/disgust/.DS_Store")
ds_store_file_3 = Path("../datasets/train/fear/.DS_Store")
ds_store_file_4 = Path("../datasets/train/happy/.DS_Store")
ds_store_file_5 = Path("../datasets/train/neutral/.DS_Store")
ds_store_file_6 = Path("../datasets/train/sad/.DS_Store")
ds_store_file_7 = Path("../datasets/train/surprise/.DS_Store")

deleteDStoreFile(ds_store_file_1)
deleteDStoreFile(ds_store_file_2)
deleteDStoreFile(ds_store_file_3)
deleteDStoreFile(ds_store_file_4)
deleteDStoreFile(ds_store_file_5)
deleteDStoreFile(ds_store_file_6)
deleteDStoreFile(ds_store_file_7)

ds_store_file_1 = Path("../datasets/test/angry/.DS_Store")
ds_store_file_2 = Path("../datasets/test/disgust/.DS_Store")
ds_store_file_3 = Path("../datasets/test/fear/.DS_Store")
ds_store_file_4 = Path("../datasets/test/happy/.DS_Store")
ds_store_file_5 = Path("../datasets/test/neutral/.DS_Store")
ds_store_file_6 = Path("../datasets/test/sad/.DS_Store")
ds_store_file_7 = Path("../datasets/test/surprise/.DS_Store")

deleteDStoreFile(ds_store_file_1)
deleteDStoreFile(ds_store_file_2)
deleteDStoreFile(ds_store_file_3)
deleteDStoreFile(ds_store_file_4)
deleteDStoreFile(ds_store_file_5)
deleteDStoreFile(ds_store_file_6)
deleteDStoreFile(ds_store_file_7)

#Source: https://martinxpn.medium.com/pathlib-the-oop-approach-of-working-with-file-system-in-python-65-100-days-of-python-7dbf85e9cec2#:~:text=Creating%20Path%20Objects%20With%20pathlib,based%20on%20the%20operating%20system.
data_dir = Path(path_train) 
test_data_dir = Path(path_test)
# Set consistent
#  image sizes and number of images in each training batch
batch_size = 6000000
img_height = 48
img_width = 48

# Improve performance when using images 
# Source: https://www.tensorflow.org/tutorials/load_data/images
AUTOTUNE = tf.data.AUTOTUNE

# Keep image size consistent
## Source: https://www.tensorflow.org/tutorials/load_data/images
IMG_SIZE = 48
resize_and_rescale = tf.keras.Sequential([
  layers.Resizing(IMG_SIZE, IMG_SIZE),
  layers.Rescaling(1./255)
])


# Source https://www.tensorflow.org/tutorials/load_data/images
train_ds = tf.keras.utils.image_dataset_from_directory(
  data_dir,
  validation_split=0.2,
  subset="training",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size,
  color_mode="grayscale")

val_ds = tf.keras.utils.image_dataset_from_directory(
  data_dir,
  validation_split=0.2,
  subset="validation",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size,
  color_mode="grayscale")


test_ds = tf.keras.utils.image_dataset_from_directory(
    test_data_dir,
    shuffle=True,        
    batch_size=batch_size,
    image_size=(img_height, img_width,),
    color_mode="grayscale")




class_names = train_ds.class_names
print(class_names)
# print(len(train_ds))


# Source: https://www.tensorflow.org/tutorials/load_data/images
# RGB channel values are in the [0, 255] range, which isn't ideal for a neural network. 
# Make input values small.
normalization_layer = tf.keras.layers.Rescaling(1./255)
normalized_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))

# Improve performance when using images 
# Source: https://www.tensorflow.org/tutorials/load_data/images
train_ds = train_ds.cache().prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)


# Data augmentation
data_augmentation = tf.keras.Sequential([
    layers.RandomRotation(0.1),
    layers.RandomContrast(0.1),
    layers.RandomBrightness(factor=0.1)
])



# and
def prepare(ds, shuffle=False, augment=False):
  # Resize and rescale all datasets.
  ds = ds.map(lambda x, y: (resize_and_rescale(x), y), 
              num_parallel_calls=AUTOTUNE)
  
  # Data augmentation
  if augment:
      ds = ds.map(lambda x, y: (data_augmentation(x, training=True), y),
                  num_parallel_calls=AUTOTUNE)


  if shuffle:
    ds = ds.shuffle(1000)

  # Use buffered prefetching on all datasets.
  return ds.prefetch(buffer_size=AUTOTUNE)



# Prepare and preprocess data
train_ds = prepare(train_ds, shuffle=True, augment=True) 
val_ds = prepare(val_ds)
test_ds = prepare(test_ds)


#Source = https://www.tensorflow.org/tutorials/images/data_augmentation
# My model 
num_classes = 6
from tensorflow.keras.models import Sequential
model = Sequential([
  layers.InputLayer(batch_input_shape=(batch_size, 48, 48, 1)),
    layers.Conv2D(16, 3, padding='same', activation='elu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, 3, padding='same', activation='elu'),
    layers.MaxPooling2D((2, 2)),
    layers.Dense(256, activation='elu'),
    layers.Conv2D(128, 3, padding='same', activation='elu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(num_classes)
])
model.compile(optimizer='RMSprop',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])




epochs= 300
history = model.fit(
  train_ds,
  validation_data=val_ds,
  epochs=epochs
)
loss, acc = model.evaluate(test_ds)
print("Accuracy", acc)
# Metrics explained
# Accuracy is the total accuracy for all the predictions made so far as a percentage
#Loss is the difference between the prediiction and actual value (for every instance that the algortihm has run so far) 
# as a percentage 
# Val_Loss is the difference between the prediction and the actual value for each instance of unseen data
# going through the algorithm during training (forr )
# Val_accuracy is the accuracy per instance 



# model.export('emotionscanner')
keras.saving.save_model(model, 'emotionscanner.keras')
