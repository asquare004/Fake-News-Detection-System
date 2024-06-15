import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns 
import re
import nltk
from nltk import word_tokenize
from nltk.corpus import stopwords
from tensorflow.keras.preprocessing.text import one_hot, Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, Embedding, Input, LSTM, Conv1D, MaxPool1D, Bidirectional, Dropout, BatchNormalization
import pickle

nltk.download('stopwords')
nltk.download('wordnet')

data = pd.read_csv("WELFake_Dataset.csv")
data["final"] =  data["title"] + " " + data["text"]
data = data.dropna(axis = 0, how="any")

train_val_data = data

train_data = train_val_data.sample(frac = 0.8)
val_data = train_val_data.drop(train_data.index)

train_data = train_data.reset_index(drop=True)
val_data = val_data.reset_index(drop=True)

tokenizer = Tokenizer(num_words = 20000)
tokenizer.fit_on_texts(train_data['final'])

train_sequences = tokenizer.texts_to_sequences(train_data['final'])
val_sequences = tokenizer.texts_to_sequences(val_data['final'])

padded_train = pad_sequences(train_sequences,maxlen = 42, padding = 'post', truncating = 'post')
padded_val = pad_sequences(val_sequences,maxlen = 42, padding = 'post', truncating = 'post')

embedding_vector_features=40
model_1=Sequential()
model_1.add(Embedding(20000,embedding_vector_features,input_length=20))
model_1.add(Dropout(0.3))
model_1.add(LSTM(100))
model_1.add(Dropout(0.3))
model_1.add(Dense(1,activation='sigmoid'))
model_1.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])

y_train = np.asarray(train_data['label'])
y_val = np.asarray(val_data['label'])

model_1.fit(padded_train, y_train, batch_size=64, validation_data=(padded_val, y_val), epochs=30)

model_1.save("lstm.h5")
pickle.dump(tokenizer, open("tokenizer.sav", "wb"))

