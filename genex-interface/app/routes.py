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
    with open('datasets.json', 'r') as datasets_json:
        datasets = json.load(datasets_json)
    keys = ['ID', 'name']
    datasets = [{k: datasets[ID][k] for k in keys} for ID in datasets]
    return jsonify(datasets)

@app.route('/distances')
def get_distances():
    all_distances = pygenex.getAllDistances()
    all_distances = [x for x in all_distances if 'dtw' not in x]
    return jsonify(all_distances)


preprocessed = {}

def load_and_group_dataset(dataset, st, distance):
    key = (dataset, st, distance)
    if key in preprocessed:
        return preprocessed[key]
    else:
        with open('datasets.json','r') as datasets_json:
            datasets = json.load(datasets_json)

        name = str(datasets[dataset]['name'])
        path = str(datasets[dataset]['path'])
        load_details = pygenex.loadDataset(name, path)
        group_details = pygenex.group(name, st, distance)
        subsequences = load_details['count'] * load_details['length']\
                     * (load_details['length'] - 1) / 2

        preprocessed[key] = {
            'distance': distance,
            'count': load_details['count'], 
            'length': load_details['length'],
            'subsequences': subsequences,
            'groups': group_details
        }
        return preprocessed[key]


@app.route('/preprocess', methods = ['POST'])
def preprocess_data():
    dataset = request.form['dataset']
    st = float(request.form['st'])
    distance = str(request.form['distance'])

    return jsonify(load_and_group_dataset(dataset, st, distance))
