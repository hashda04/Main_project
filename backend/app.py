from flask import Flask, request, jsonify
import json
from datetime import datetime

app = Flask(__name__)

@app.route('/log', methods=['POST'])
def log_event():
    data = request.json
    timestamp = datetime.now().isoformat()
    log_line = { "timestamp": timestamp, "event": data }

    with open("silentwatch-logs.json", "a") as f:
        f.write(json.dumps(log_line) + "\n")

    return jsonify({ "status": "ok", "message": "Log saved." }), 200

if __name__ == '__main__':
    app.run(port=4000, debug=True)
