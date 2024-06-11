import regex as re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


nltk.download('stopwords')
nltk.download('wordnet')


def preprocess_text(text):
    text = re.sub(r"\W", " ", text)
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    text = text.strip()
    tokens = text.split()
    tokens = [word for word in tokens if word not in stopwords.words("english")]
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    return " ".join(tokens)
