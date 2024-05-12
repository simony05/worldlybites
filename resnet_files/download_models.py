# import necessary packages
import gdown
import tensorflow
from tensorflow import keras
from keras.models import load_model
from keras import backend as K


# DOWNLOAD MODELS FROM GOOGLE DRIVE

# download old model from google drive
old_file_id = '1dfUncnbIEY0bLN-IAZKi_A4zqoTStNjY'
old_url = f'https://drive.google.com/uc?id={old_file_id}'
old_output = 'old_model.keras'

gdown.download(old_url, old_output, quiet=False)

# download new model from google drive
new_file_id = '1dHT7Vxo5wud0_npHLqUFTa0317a99-iv'
new_url = f'https://drive.google.com/uc?id={new_file_id}'
new_output = 'new_model.keras'

gdown.download(new_url, new_output, quiet=False)


# LOAD MODELS

# load old model
model = load_model('old_model.keras')

# load new model
def sum_binary_crossentropy(y_true, y_pred):
    # function for custom loss function in second version of model
    return K.sum(K.binary_crossentropy(y_true, y_pred))

custom_objects = {"sum_binary_crossentropy": sum_binary_crossentropy}
model = load_model('new_model.keras', custom_objects=custom_objects)
