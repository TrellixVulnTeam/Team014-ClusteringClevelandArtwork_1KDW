import time
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/time', methods=['POST'])
def get_current_time():
    print(request.get_json())
    return {'time': time.time()}
