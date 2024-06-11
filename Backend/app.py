from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app) 
@app.route('/predict', methods=['POST'])
def get_data():
    # Create a JSON object containing data
    data = request.json.get('data')
    # Return the JSON object with a response saying "Thank you"
    return jsonify({
        "response": "Thank you",
        "data": data
    })

if __name__ == '__main__':
    app.run(debug=True)
