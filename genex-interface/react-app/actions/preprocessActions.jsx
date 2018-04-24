import {
  LOAD_AND_GROUP_DATASET,
  GET_ALL_DATASETS,
  GET_ALL_DISTANCES,
  UPDATE_OPERATOR,
  UPDATE_ALL_QUERIES
} from './actionTypes'

import { updateAllQueries } from './queryActions'
import handleErrors, { logError } from './handleErrors'

/** Makes request for a list of all datasets */
const requestGetAllDatasets = () => {
  return (dispatch) => {
    // TODO: add report here if error occurs
    fetch('/datasets')
      .then(handleErrors)
      .then(response => (response.json()))
      .then(result => {
        dispatch(updateAllDatasets(result));
      })
      .catch(logError);
  }
}

/** Updates the app state with the returned list of datasets */
const updateAllDatasets = (allDatasets) => ({
  type: GET_ALL_DATASETS,
  allDatasets
})

/** Makes request for a list of all distances */
const requestGetAllDistances = () => {
  return (dispatch) => {
    // TODO: add report here if error occurs
    fetch('/distances')
      .then(handleErrors)
      .then(response => (response.json()))
      .then(result => {
        dispatch(updateAllDistances(result));
      })
      .catch(logError);
  }
}

/** Updates the app state with the returned list of datasets */
const updateAllDistances = (allDistances) => ({
  type: GET_ALL_DISTANCES,
  allDistances
})

/**
 * Makes request for loading and grouping data.
 * @param {string} datasetID id of a dataset to load and group.
 * @param {string} distance id of a distance used in grouping.
 * @param {number} st similarity threshold.
 */
const requestLoadAndGroupDataset = (datasetID, distance, st) => {
  return (dispatch) => {
    dispatch(loadAndGroupDataset(true));
    var formData = new FormData();

    formData.append('datasetID', datasetID);
    formData.append('distance', distance);
    formData.append('st', st);

    fetch('/preprocess', {
      method: 'post',
      body: formData
    })
      .then(handleErrors)
      .then(response => (response.json()))
      .then(json => {
        let dataset = {
          ID: datasetID,
          count: json.count,
          length: json.length,
          subseq: json.subseq
        };;
        let groups = {
          count: json.groupCount,
          density: json.groupDensity
        };
        dispatch(loadAndGroupDataset(
          false,
          dataset,
          distance,
          st,
          groups)
        );
        dispatch(updateAllQueries(
          'dataset',
          json.timeSeries)
        );
      })
      .catch(logError);
  }
}

/**
 * If isGrouping is true, other params are optional. Otherwise, these params
 * are used to update the current state of the app.
 * @param {bool} isGrouping indicate grouping is in progress.
 * @param {object} [dataset] object containing information about the dataset.
 * @param {string} [distance] distance used in grouping.
 * @param {number} [st] similarity threshold used in grouping.
 * @param {object} [groups] object containing information about the groups.
 */
const loadAndGroupDataset = (
  isGrouping
  , dataset
  , distance
  , st
  , groups) => ({
    type: LOAD_AND_GROUP_DATASET,
    isGrouping,
    dataset,
    distance,
    st,
    groups
  })

/**
 * If currentOperator is 'FindMotif', params is optional. If it is 
 * 'FindBestMatches' then we take k as a params.
 * @param {string} currentOperator tab that needs to be open.
 * @param {object} [params] contains additional parameters like k.
 */
const updateOperator = (
  currentOperator
  , params) => ({
    type: UPDATE_OPERATOR,
    currentOperator,
    params
  })

export {
  requestLoadAndGroupDataset,
  requestGetAllDatasets,
  requestGetAllDistances,
  updateOperator
};
