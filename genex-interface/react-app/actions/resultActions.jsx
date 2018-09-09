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
  , query) => (
  (dispatch) => {
    dispatch(loadResults(true));

    const datasetID = dataset.ID;
    const queryType = query.selected.type;
    const { index, start, end } = query.selected.dataset;

    if (operator.current == 'ksim') {
      const k = operator.ksim.k;
      const ke = k;
      const params = { k, ke, datasetID, st, distance, queryType, index, start, end };
      const stringified = queryString.stringify(params);
      fetch("/ksim?" + stringified)
        .then(handleErrors)
        .then(response => (response.json()))
        .then(result => {
          const frozenQuery = {
            index, start, end,
            type: queryType,
            name: query.allQueries[queryType][index].name,
            raw: query.selectedRaw[queryType]
          };
          dispatch(loadResults(false, 'ksim', frozenQuery, result))
        })
        .catch(logError)
    }
    else {
      console.log('Operator ' + operator.current + ' is not supported.');
    }
})

const loadResults = (isWorking, resultType, frozenQuery, result) => ({
  type: LOAD_RESULTS,
  isWorking,
  resultType,
  frozenQuery,
  result
});

export {
  requestResult
};