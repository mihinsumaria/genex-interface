from app import app
from flask import render_template, jsonify, request, url_for
import json
import pygenex
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO
import base64

def get_base64_encoding(data):
	fig = plt.figure(figsize=(15, 3))
	ax = fig.add_subplot(1, 1, 1)
	ax.plot(data)
	io = BytesIO()
	fig.savefig(io, format='png')
	return base64.encodestring(io.getvalue()).decode()

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/datasets')
def get_datasets():
    with open('datasets.json', 'r') as datasets_json:t 
        datasets = json.load(datasets_json)
    keys = ['ID', 'name']
    datasets = [{k: x[k] for k in keys} for x in datasets]
    return jsonify(datasets)

@app.route('/distances')
def get_distances():
	alldistances = pygenex.getAllDistances()
	alldistances = [x for x in alldistances if 'dtw' not in x]
	return jsonify(alldistances)

preprocessed = {}

@app.route('/preprocess', methods = ['GET','POST'])
def preprocess_data():
	if request.method == "POST":
		dataset = int(request.form['dataset'])
		st = float(request.form['st'])
		distance = str(request.form['distance'])

		key = str(dataset) + distance + str(st)
		if key in preprocessed:
			return jsonify(preprocessed[key])	

		else:
			
			with open('datasets.json','r') as datasets_json:
				datasets = json.load(datasets_json)

			name = str(datasets[dataset-1]['name'])
			path = str(datasets[dataset-1]['path'])
			loaddetails = pygenex.loadDataset(name,path)
			groupdetails = pygenex.group(name,st,distance)
			subsequences = loaddetails['count']*loaddetails['length']*(loaddetails['length']-1)/2

			preprocessed[key] = {'ID':dataset,'name':name,'st':st,'distance':distance,'count':loaddetails['count'], 'length':loaddetails['length'],'subsequences':subsequences,'groups':groupdetails}
			return jsonify(preprocessed[key])
