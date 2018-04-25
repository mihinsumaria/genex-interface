import queryString from 'query-string'
import {
	LOAD_RESULTS,
} from './actionTypes'

import { handleErrors, logError } from './handleErrors';

const requestLoadResults = (
  dataset
  , distance
  , st
  , operator
  , selected) => {

  return (dispatch) => {
    dispatch(loadResults(true));
    const k = operator.kbest.k;
    const ke = operator.kbest.k;
    const datasetID = dataset.ID;
    const queryType = selected.type;
    const { index, start, end } = selected.dataset;
    const params = { k, ke, datasetID, st, distance, queryType, index, start, end };
    const stringified = queryString.stringify(params);
    fetch("/ksim?" + stringified)
    .then(handleErrors)
    .then(response => (response.json()))
    .then(ksim => {
      dispatch(loadResults(false, ksim))
    })
    .catch(logError)
  }
}

const loadResults = (isWorking, ksim) => ({
  type: LOAD_RESULTS,
  isWorking,
  ksim
})

export {
	requestLoadResults
};