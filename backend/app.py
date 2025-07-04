from flask import Flask, jsonify, request

app = Flask(__name__)

# A simplified version to get a certain digit of Pi via HTTP query
@app.route('/pi/<int:n>', methods=['GET'])
def get_pi_digit(n):
    # Using predefined Pi digits for demonstration purposes
    pi_digits = "3141592653589793238462643383279502884197169399375105820974944592"
    if 1 <= n <= len(pi_digits):
        return jsonify({'digit': pi_digits[n - 1]}), 200
    return jsonify({'error': 'Out of range'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
