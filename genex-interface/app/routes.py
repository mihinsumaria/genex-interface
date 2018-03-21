from app import app
from flask import render_template, jsonify, request, url_for
import json
import pygenex
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO
import base64

html = '''
<html>
    <body>
        <img src="data:image/png;base64, {}" />
    </body>
</html>
'''

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/datasets')
def get_datasets():
    with open('datasets.json', 'r') as datasets_json:
        datasets = json.load(datasets_json)
    keys = ['ID', 'name']
    datasets = [{k: x[k] for k in keys} for x in datasets]
    return jsonify(datasets)

@app.route('/distances')
def get_distances():
	alldistances = pygenex.getAllDistances()
	alldistances = [x for x in alldistances if 'dtw' not in x]
	return jsonify(alldistances)

@app.route('/test_base64')
def get_base64_thumb():
	data_name = pygenex.loadDataset('ItalyPowerDemand', 'datasets/test/ItalyPowerDemand_DATA')
	data = pygenex.getTimeSeries(data_name['name'], 1, 3, 10)
	fig = plt.figure(figsize=(15, 3))
	ax = fig.add_subplot(1, 1, 1)
	ax.plot(data)
	io = BytesIO()
	fig.savefig(io, format='png')
	data = base64.encodestring(io.getvalue())
	return html.format(data.decode())