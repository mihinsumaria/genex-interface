import json
import os

from flask import jsonify, render_template, request

import pygenex
from app import app

from .picture import get_group_density_base64, get_line_thumbnail_base64
from .exceptions import ServerException, ArgumentRequired

GROUPS_SIZE_FOLDER = 'local/groupsize'


def check_exists(arg, arg_name=''):
    if arg is None:
        raise ArgumentRequired(arg_name)
    return arg


def make_name(ID, st, distance):
    return str(ID) + str(st) + str(distance)


@app.errorhandler(ServerException)
def handle_server_exception(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.errorhandler(RuntimeError)
def handle_runtime_error(error):
    response = jsonify({'message': error.message})
    response.status_code = 400
    return response


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


def load_and_group_dataset(datasetID, st, distance):
    key = (datasetID, st, distance)
    if key in preprocessed:
        return preprocessed[key]
    else:
        # Read dataset list
        with open('datasets.json', 'r') as datasets_json:
            datasets = json.load(datasets_json)
        name = make_name(*key)
        path = str(datasets[datasetID]['path'])

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
def preprocess():
    form = request.form
    datasetID = check_exists(form.get('datasetID'), 'datasetID')
    st = check_exists(form.get('st', type=float), 'st')
    distance = check_exists(form.get('distance', type=str), 'distance')

    return jsonify(load_and_group_dataset(datasetID, st, distance))


@app.route('/sequence')
def get_sequence():
    args = request.args
    datasetID = check_exists(args.get('datasetID'), 'datasetID')
    st = check_exists(args.get('st', type=float), 'st')
    distance = check_exists(args.get('distance', type=str), 'distance')
    sequenceIndex = check_exists(args.get('index', type=int), 'index')

    key = (datasetID, st, distance)
    if key in preprocessed:
        name = make_name(*key)
        series = pygenex.getTimeSeries(name, sequenceIndex)

        return jsonify(series)

    raise ServerException(
        'Please call "/preprocess" first to ensure the dataset is processed.'
    )
