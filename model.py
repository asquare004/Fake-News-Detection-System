import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import pickle

def predict(test_prediction_classes):
    if(test_prediction_classes[0][0]):
        return "Real News"
    else:
        return "Fake News"


def is_fake_news(news):
    model = load_model("cnn_lstm.h5")
    tokenizer = pickle.load(open("tokenizer.sav", "rb"))
    test_sequences = tokenizer.texts_to_sequences(news)
    padded_test = pad_sequences(test_sequences,maxlen = 42, padding = 'post', truncating = 'post')
    test_predictions = model.predict(padded_test)
    test_prediction_classes = (test_predictions > 0.5).astype("int32")
    return predict(test_prediction_classes)