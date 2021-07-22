import tensorflow as tf
import os


def load_model():
    full_path = os.path.realpath(__file__)
    model_path = full_path.replace('adaload.py','ADA1.h5')
    model = tf.keras.models.load_model(model_path, compile = False)
    return model
