from flask import Flask, jsonify
from flask_cors import CORS
from monitor import monitor_bp  # monitor.py must be in same folder as this file

app = Flask(__name__)
CORS(app)  # allow frontend (e.g., localhost:3000) to call these APIs

# Register monitor blueprint
app.register_blueprint(monitor_bp)

# Health check route (optional)
@app.route('/')
def health():
    return jsonify({'status': 'backend up'}), 200

if __name__ == '__main__':
    app.run(debug=True)
