from app import app
from flask import render_template, jsonify, request, url_for
import json
import pygenex

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



