import gzip
import shutil
import sys
import tensorflow as tf
import tempfile
from keras import backend as K
import json  

# IMPORTANT
# resnet_model.keras too big for github
# get it by downloading to local computer
# https://drive.google.com/uc?id=1dHT7Vxo5wud0_npHLqUFTa0317a99-iv

def sum_binary_crossentropy(y_true, y_pred):
    # function for custom loss function in second version of model
    return K.sum(K.binary_crossentropy(y_true, y_pred))
custom_objects = {"sum_binary_crossentropy": sum_binary_crossentropy}
model = tf.keras.models.load_model('resnet_model.keras', custom_objects=custom_objects)
json_string = model.to_json()
with open('model.json', 'w') as f:
    json.dump(json_string, f, indent=4)

f = open('model.json')
data = json.load(f)
test_model = tf.keras.models.model_from_json(data, custom_objects=custom_objects)
test_model.load_weights('my_model_weights.h5')
