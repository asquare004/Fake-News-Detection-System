from flask import Flask, jsonify, request
from flask_cors import CORS
from model import is_fake_news;


app = Flask(__name__)

CORS(app)

@app.route('/predict', methods=['POST'])
def get_data():

    print(request.json)
    data = request.json.get('data')
    prediction  = is_fake_news(data)
    
    return jsonify({
        "response": prediction,
        "data": data
    })

if __name__ == '__main__':
    app.run(debug=True)
