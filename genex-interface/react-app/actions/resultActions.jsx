import queryString from 'query-string'
import {
  LOAD_RESULTS,
} from './actionTypes'

import handleErrors, { logError } from './handleErrors';

const requestResult = (
  dataset
  , distance
  , st
  , operator
  , selected) => (
  (dispatch) => {
    dispatch(loadResults(true));

    const datasetID = dataset.ID;
    const queryType = selected.type;
    const { index, start, end } = selected.dataset;

    if (operator.current == 'ksim') {
      const k = operator.ksim.k;
      const ke = operator.ksim.k;
      const params = { k, ke, datasetID, st, distance, queryType, index, start, end };
      const stringified = queryString.stringify(params);
      fetch("/ksim?" + stringified)
        .then(handleErrors)
        .then(response => (response.json()))
        .then(result => {
          dispatch(loadResults(false, 'ksim', result))
        })
        .catch(logError)
    }
    else {
      console.log('Operator ' + operator.current + ' is not supported.');
    }
})

const loadResults = (isWorking, resultType, result) => ({
  type: LOAD_RESULTS,
  isWorking,
  resultType,
  result
});

export {
  requestResult
};