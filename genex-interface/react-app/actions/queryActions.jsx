import queryString from 'query-string'
import {
  UPDATE_ALL_QUERIES,
  UPDATE_SELECTED_QUERY,
  UPDATE_SELECTED_QUERY_RAW_DATA,
  UPDATE_INCLUDE_QUERY,
} from './actionTypes';

import handleErrors, { logError } from './handleErrors';

/**
 * Updates QuerySelectContainer with new queries
 * @param {string} queryType can either be 'dataset', 'upload', or 'draw'
 * @param {array} queries array of new queries. 
 *                        Each element is a tuple of (name, thumbnail) 
 * for each timeseries in the dataset. 
 */
const updateAllQueries = (queryType, queries) => ({
  type: UPDATE_ALL_QUERIES
  , queryType
  , queries
})

/**
 * Updates the current selected query
 * @param {string} queryType type of query to change to.
 */
const updateSelectedQuery = (queryType, params) => ({
  type: UPDATE_SELECTED_QUERY
  , queryType
  , params
})

/**
 * Makes request for getting a sequence.
 * @param {string} datasetID id of a dataset to get sequence.
 * @param {string} distance
 * @param {number} st 
 * @param {number} index index of the sequence.
 */
const requestGetSequence = (datasetID, distance, st, index) => {
  return (dispatch) => {
    const params = { datasetID, distance, st, index };

    const stringified = queryString.stringify(params);

    // Call this action with nothing to trigger the spinner
    dispatch(updateSelectedQueryRawData());
    fetch("/sequence?" + stringified)
      .then(handleErrors)
      .then(response => (response.json()))
      .then(raw => {
        dispatch(updateSelectedQueryRawData('dataset', raw));
      })
      .catch(logError);
  }
}

/**
 * Updates data of a query type.
 * @param {string} queryType type of query.
 * @param {array} raw raw data to update.
 */
const updateSelectedQueryRawData = (queryType, raw) => ({
  type: UPDATE_SELECTED_QUERY_RAW_DATA
  , queryType
  , raw
})

/**
 * Upload a query file.
 * @param {object} formData form data of the uploader
 */
const uploadQuery = (formData) => {
  return (dispatch) => {
    fetch('/upload', {
      method: 'PUT',
      body: formData
    })
      .then(handleErrors)
      .then(response => (response.json()))
      .then(series => {
        dispatch(updateAllQueries('upload', series));
      })
      .catch(logError);
  };
}

/**
 * Updates inclusion of query related results.
 * @param {boolean} include boolean that indicates 
 * inclusion preference.
 */
const updateIncludeQuery = (include) => ({
  type: UPDATE_INCLUDE_QUERY
  , include
})

export {
  updateAllQueries
  , updateSelectedQuery
  , updateSelectedQueryRawData
  , requestGetSequence
  , uploadQuery
  , updateIncludeQuery
};