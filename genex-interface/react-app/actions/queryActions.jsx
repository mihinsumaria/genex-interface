import {
  SELECT_QUERY
} from './actionTypes'

/**
* Updates query.selected based on the query or type chosen.
* @param {object} selected is an updated version of selected
* in the application state. 
*/
const updateSelected = (selected) => ({
  type: SELECT_QUERY
  , selected
})

export {
  updateSelected
};