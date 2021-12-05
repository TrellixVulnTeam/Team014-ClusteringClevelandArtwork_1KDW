import time
from flask import Flask, request
from flask_cors import CORS
from kmeans import ArtKMeans
import sqlite3 as lite
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/time', methods=['POST'])
def get_current_time():
    print(request.get_json())
    """
    con = lite.connect('FinalProject.db')
    df_artworks = pd.read_sql_query('SELECT * from artworks', con)

    model = ArtKMeans()

    model.fit()
    """
    return {'time': time.time()}
