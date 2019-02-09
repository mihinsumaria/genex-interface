import json
import logging
import os

import pygenex
from flask import jsonify, render_template, request

from app import app

from .cache import GenexCache
from .exceptions import ServerException, FileError
from .picture import get_group_density_base64, get_line_thumbnail_base64
from .utils import *

GROUPS_SIZE_FOLDER = 'local/groupsize'
GROUPS_SAVE_FOLDER = 'local/saved'
UPLOAD_PATH = 'datasets/uploaded_query.txt'
ALLOWED_EXTENSIONS = set(['txt', 'csv'])
cache = GenexCache(default_timeout=0, threshold=10)


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
def index_page():
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
    if cache.has(key):
        app.logger.debug('Found cache for %s', key)
        return cache.get(key)
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

        #Load and save group
        groups_file_name = os.path.join(GROUPS_SAVE_FOLDER, name + '.txt')
        if name + '.txt' in os.listdir(GROUPS_SAVE_FOLDER):
            group_count = pygenex.loadGroups(name, groups_file_name)
        else:
            group_count = pygenex.group(name, st, distance)
            pygenex.saveGroups(name, groups_file_name)

        # Save group size
        if not os.path.exists(GROUPS_SIZE_FOLDER):
            os.makedirs(GROUPS_SIZE_FOLDER)
        group_size_path = os.path.join(GROUPS_SIZE_FOLDER, name)
        pygenex.saveGroupsSize(name, group_size_path)

        # Cache the results and return
        subsequences = load_details['count'] * load_details['length']\
            * (load_details['length'] - 1) / 2
        density = get_group_density_base64(group_size_path)
        info = {
            'count': load_details['count'],
            'length': load_details['length'],
            'subseq': subsequences,
            'groupCount': group_count,
            'groupDensity': density,
            'timeSeries': allTimeSeries
        }
        cache.set(key, info)
        return info


@app.route('/preprocess', methods=['POST'])
def preprocess():
    form = request.form
    datasetID = check_exists(form.get('datasetID'), 'datasetID')
    st = check_exists(form.get('st', type=float), 'st')
    distance = check_exists(form.get('distance', type=str), 'distance')

    return jsonify(load_and_group_dataset(datasetID, st, distance))


@app.route('/upload', methods=['PUT'])
def upload_sequences():
    def allowed_file(filename):
        return '.' in filename and \
                filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    query_file = check_exists(request.files.get('queryFile'), 'queryFile')
    has_name_col = request.form.get('hasNameCol', False, type=bool)
    if query_file.filename == '':
        raise FileError('No file selected')

    if query_file and allowed_file(query_file.filename):
        query_file.save(UPLOAD_PATH)
        # TODO: limit the size of the uploaded set
        load_details = pygenex.loadDataset('upload',
                                           UPLOAD_PATH,
                                           hasNameCol=has_name_col)
        pygenex.normalize('upload')
        allTimeSeries = get_names_and_thumbnails('upload',
                                                 load_details['count'])
        for i in range(load_details['count']):
            series = pygenex.getTimeSeries('upload', i)
            allTimeSeries[i]['raw'] = attach_index(series)

        pygenex.unloadDataset('upload')
        os.remove(UPLOAD_PATH)
        return jsonify(allTimeSeries)

    raise FileError('Invalid file type')


@app.route('/sequence')
def get_sequence():
    args = request.args
    datasetID = check_exists(args.get('datasetID'), 'datasetID')
    st = check_exists(args.get('st', type=float), 'st')
    distance = check_exists(args.get('distance', type=str), 'distance')
    sequenceIndex = check_exists(args.get('index', type=int), 'index')

    load_and_group_dataset(datasetID, st, distance)

    name = make_name(datasetID, st, distance)
    series = pygenex.getTimeSeries(name, sequenceIndex)
    series = attach_index(series)
    return jsonify(series)

    raise ServerException(
        'Please call "/preprocess" first to ensure the dataset is processed.'
    )


@app.route('/ksim')
def get_ksim():
    args = request.args
    k = check_exists(args.get('k', type=int), 'k')
    ke = check_exists(args.get('ke', type=int), 'ke')
    datasetID = check_exists(args.get('datasetID'), 'datasetID')
    st = check_exists(args.get('st', type=float), 'st')
    distance = check_exists(args.get('distance', type=str), 'distance')
    queryType = check_exists(args.get('queryType', type=str), 'queryType')
    index = check_exists(args.get('index', type=int), 'index')
    start = check_exists(args.get('start', -1, type=int), 'start')
    end = check_exists(args.get('end', -1, type=int), 'end')

    load_and_group_dataset(datasetID, st, distance)

    name = make_name(datasetID, st, distance)
    query_name = name
    target_name = name
    ksim = pygenex.ksim(k, ke, target_name, query_name, index, start, end)
    for result in ksim:
        raw = pygenex.getTimeSeries(name,
                                    result['data']['index'],
                                    result['data']['start'],
                                    result['data']['end'])
        resultName = pygenex.getTimeSeriesName(name, result['data']['index'])
        result['raw'] = attach_index(raw)
        result['name'] = resultName

    return jsonify(ksim)
