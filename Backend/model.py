import pandas as pd
import pickle
import sklearn
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
import text_preprocessing



def predict(X, model):
    if(model.predict(X)):
        return "Real News"
    else:
       return "Fake News"


def is_fake_news(news):
    vectorizer = pickle.load(open("vectorizer.sav", "rb"))
    trained_model = pickle.load(open("trained_model.sav", "rb"))
    text = news
    data = pd.DataFrame({"final" : [text_preprocessing.preprocess_text(text)]})
    X = vectorizer.transform(data["final"]).toarray()
    return predict(X, trained_model)
