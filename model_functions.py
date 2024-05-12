# import necessary packages
#import matplotlib.pyplot as plt
import numpy as np
#import pandas as pd
#import os
#import PIL
import cv2
#import pathlib
import tensorflow as tf
from tensorflow import keras
from keras import backend as K
import json


# FUNCTION DEFINITIONS

def sum_binary_crossentropy(y_true, y_pred):
    # function for custom loss function in second version of model
    return K.sum(K.binary_crossentropy(y_true, y_pred))

def process_img(image_path):
    # function for processing image for model input
    # image_path: str with image path location

    img_height,img_width=224,224

    image = cv2.imread(image_path)
    image_resized = cv2.resize(image, (img_height,img_width))
    image = np.expand_dims(image_resized,axis=0)

    return image

def resnet_prediction(model, image, threshold = 1.8153345e-03):
    # function for getting list of predicted ingredients in a processed image
    # model: keras model loaded from directory
    # image: numpy array containing pixel info (result of process_img)
    class_names = ['apple', 'avocado', 'banana', 'beans', 'beef', 
                   'bellpepper', 'bread', 'butter', 'carrot', 'cheese', 
                   'chicken', 'eggs', 'fish', 'flour', 'garlic', 
                   'honey', 'lentils', 'lettuce', 'lime', 'milk', 
                   'oats', 'onion', 'pasta', 'pork', 'potato', 
                   'rice', 'spinach', 'sugar', 'tofu', 'tomato']
    pred = model.predict(process_img(image))
    pred = np.array(pred)

    output_classes = list(map(lambda j: class_names[j], [j for j in range(len(class_names)) if pred[0][j] > threshold]))
    return output_classes


# LOADING IN MODELS (commented out so you can change the path of where the model is stored)

# first version of model
# old_model = tf.keras.models.load_model('resnet_model.keras')

# second version of model with custom loss function
custom_objects = {"sum_binary_crossentropy": sum_binary_crossentropy}
f = open('model.json')
data = json.load(f)
test_model = tf.keras.models.model_from_json(data, custom_objects=custom_objects)
test_model.load_weights('my_model_weights.h5')

print(resnet_prediction(test_model, 'test_val.jpg'))


