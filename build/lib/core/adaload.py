import tensorflow as tf

def load_model():
    model = tf.keras.models.load_model("core/ADA1.h5", compile = False)
    return model

