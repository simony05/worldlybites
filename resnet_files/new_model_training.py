# import necessary packages
import matplotlib.pyplot as plt
import numpy as np
import os
import PIL
import pathlib
import cv2
import imghdr
import tensorflow as tf
from tensorflow import keras
from PIL import Image
from keras import backend as K


# PROCESS TRAIN / VAL DATA

# create pathlib directory to ingredients folder 
# ^ ONE MAIN folder full of 30 SUB folders
#   each sub folder corresponding to an ingredient and full of images of that ingredient
data_dir = 'ingredients'  # change path to wherever ingredients folder is located
data = pathlib.Path(data_dir)

# create training ds
img_height,img_width=224,224
batch_size=32
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
  data,
  validation_split=0.2,
  subset="training",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size)

# create validation ds
val_ds = tf.keras.preprocessing.image_dataset_from_directory(
  data,
  validation_split=0.2,
  subset="validation",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size)

# get class names
class_names = train_ds.class_names

# one-hot encode data for model training
def preprocess_label(label):
    num_classes = 30  # Assuming 30 classes
    return tf.one_hot(label, num_classes)

train_ds = train_ds.map(lambda x, y: (x, preprocess_label(y)))
val_ds = val_ds.map(lambda x, y: (x, preprocess_label(y)))


# MODEL TRAINING

# create model instance
resnet_model = tf.keras.Sequential()

# import pre-trained model
pretrained_model= tf.keras.applications.ResNet50(include_top=False,
                   input_shape=(224,224,3),
                   pooling='avg', classes=30,
                   weights='imagenet')
for layer in pretrained_model.layers:
        layer.trainable=False

# add layers for our purpose
resnet_model.add(pretrained_model)
resnet_model.add(tf.keras.layers.Flatten())
resnet_model.add(tf.keras.layers.Dense(512, activation='relu'))
resnet_model.add(tf.keras.layers.Dense(30, activation='sigmoid'))

# custom loss function
def sum_binary_crossentropy(y_true, y_pred):
    return K.sum(K.binary_crossentropy(y_true, y_pred))

# compile model
resnet_model.compile(optimizer='adam', loss=sum_binary_crossentropy, metrics=['accuracy'])

# train model
history = resnet_model.fit(
  train_ds,
  validation_data=val_ds,
  epochs=5
)


# SAVING MODEL

# save model in .keras format
resnet_model.save('resnet_model_2.keras')

# save model in .h5 format
resnet_model.save('resnet_model_2.h5')
