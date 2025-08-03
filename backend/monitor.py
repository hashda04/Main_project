import os
import json
from datetime import datetime
from flask import Blueprint, request, jsonify

monitor_bp = Blueprint('monitor', __name__)

# Set up logs directory and file path (absolute paths to avoid cwd issues)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOGS_DIR = os.path.join(BASE_DIR, 'logs')
LOG_PATH = os.path.join(LOGS_DIR, 'silentwatch.jsonl')

# Ensure logs/ exists
os.makedirs(LOGS_DIR, exist_ok=True)
print(f"[SilentWatch] logs dir: {LOGS_DIR}, exists: {os.path.exists(LOGS_DIR)}")

# Endpoint to receive logs from frontend
@monitor_bp.route('/monitor/logs', methods=['POST'])
def receive_logs():
    payload = request.get_json(silent=True) or {}
    events = payload.get('events', [])
    page = payload.get('page')
    timestamp = payload.get('timestamp', datetime.utcnow().isoformat())

    try:
        with open(LOG_PATH, 'a', encoding='utf-8') as f:
            for ev in events:
                record = {
                    'received_at': datetime.utcnow().isoformat(),
                    'page': page,
                    'payload_timestamp': timestamp,
                    'event': ev
                }
                f.write(json.dumps(record) + "\n")
    except Exception as e:
        print("Failed to write log:", e)
    return jsonify({'status': 'ok', 'received': len(events)}), 200

# Endpoint to fetch recent logs for dashboard/debug
@monitor_bp.route('/monitor/recent', methods=['GET'])
def recent_logs():
    limit = int(request.args.get('limit', 50))
    lines = []
    if os.path.exists(LOG_PATH):
        with open(LOG_PATH, 'r', encoding='utf-8') as f:
            all_lines = f.readlines()
            for l in all_lines[-limit:]:
                try:
                    lines.append(json.loads(l))
                except json.JSONDecodeError:
                    continue
    return jsonify(lines)
