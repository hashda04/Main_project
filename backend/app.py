# backend/app.py

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend access (important for React)
@app.route('/')
def home():
    return 'Welcome to SilentWatch backend!'


# Example API: GET
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({'message': 'Hello from Flask backend!'})

# Example API: POST
@app.route('/api/submit', methods=['POST'])
def submit_data():
    data = request.get_json()
    print("Received data:", data)
    return jsonify({'status': 'success', 'data': data})

if __name__ == '__main__':
    app.run(debug=True)
