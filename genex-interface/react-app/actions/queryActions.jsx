import queryString from 'query-string'
import {
  UPDATE_SELECTED_QUERY
} from './actionTypes';

import { handleErrors, logError } from './handleErrors';

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
    
    fetch("/sequence?" + stringified)
      .then(handleErrors)
      .then(response => (response.json()))
      .then(result => {
        console.log(result);
      })
      .catch(logError);
  }
}

export {
  updateSelectedQuery
  , requestGetSequence
};