import pandas as pd
import re
import sklearn
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle
import text_preprocessing


def model_train(X, y, model):
    model.fit(X, y)


data = pd.read_csv("WELFake_Dataset.csv")
data["final"] =  data["title"] + " " + data["text"]
data = data.dropna(axis = 0, how = "any")
data["final"] = data["final"].apply(text_preprocessing.preprocess_text)
vectorizer = TfidfVectorizer(max_features=5000)


X = vectorizer.fit_transform(data["final"]).toarray()
y = data["label"]
model = LogisticRegression()


model_train(X, y, model)


pickle.dump(model, open("trained_model.sav", "wb"))
pickle.dump(vectorizer, open("vectorizer.sav", "wb"))