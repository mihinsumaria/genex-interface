import json
import os

from flask import jsonify, render_template, request

import pygenex
from app import app

from .picture import get_group_density_base64, get_line_thumbnail_base64

GROUPS_SIZE_FOLDER = 'local/groupsize'


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


def get_names_and_thumbnails(name, count):
    allTimeSeries = []
    for i in range(count):
        ts = pygenex.getTimeSeries(name, i)
        allTimeSeries.append({
            'name': pygenex.getTimeSeriesName(name, i),
            'thumbnail': get_line_thumbnail_base64(ts)
        })
    return allTimeSeries


def load_and_group_dataset(dataset, st, distance):
    key = (dataset, st, distance)
    if key in preprocessed:
        return preprocessed[key]
    else:
        # Read dataset list
        with open('datasets.json', 'r') as datasets_json:
            datasets = json.load(datasets_json)
        name = str(datasets[dataset]['name']) + str(st) + str(distance)
        path = str(datasets[dataset]['path'])

        # Load, normalize, and group the dataset
        load_details = pygenex.loadDataset(name, path)
        pygenex.normalize(name)
        allTimeSeries = get_names_and_thumbnails(name, load_details['count'])
        group_count = pygenex.group(name, st, distance)
        # Save group size
        if not os.path.exists(GROUPS_SIZE_FOLDER):
            os.makedirs(GROUPS_SIZE_FOLDER)
        group_size_path = os.path.join(GROUPS_SIZE_FOLDER, name)
        pygenex.saveGroupsSize(name, group_size_path)

        # Cache the results and return
        subsequences = load_details['count'] * load_details['length']\
            * (load_details['length'] - 1) / 2
        density = get_group_density_base64(group_size_path)
        preprocessed[key] = {
            'count': load_details['count'],
            'length': load_details['length'],
            'subseq': subsequences,
            'groupCount': group_count,
            'groupDensity': density,
            'timeSeries': allTimeSeries
        }
        return preprocessed[key]


@app.route('/preprocess', methods=['POST'])
def preprocess_data():
    dataset = request.form['dataset']
    st = float(request.form['st'])
    distance = str(request.form['distance'])

    return jsonify(load_and_group_dataset(dataset, st, distance))
