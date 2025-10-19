from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    amount = data.get('amount')
    # Basic validation
    if not amount or amount < 1:
        return jsonify({'error': 'Invalid amount'}), 400
    # Simulate payment processing logic
    return jsonify({'status': 'success', 'message': f'Payment of ${amount} processed'}), 200

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name', '').strip()
    message = data.get('message', '').strip()
    # Basic validation
    if not name or not message:
        return jsonify({'error': 'Name and message required'}), 400
    # Simulate storing message
    return jsonify({'status': 'success', 'message': 'Message received'}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', '').strip()
    password = data.get('password', '').strip()
    # Basic dummy check
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400
    # Simulate user check (always succeed for demo)
    return jsonify({'status': 'success', 'message': 'Login successful'}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
