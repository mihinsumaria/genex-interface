import {
  GET_ALL_DATASET_QUERIES,
  UPDATE_SELECTED_QUERY
} from '../actions/actionTypes'

export default (
  state = {
    allQueries: {
      dataset: [],
      upload: {

      }
    },
    selected: {
      type: 'dataset',
      dataset: {
        index: 0,
        start: 0,
        end: 100
      },
      upload: {
      },
    }
  },
  action) => {
  switch (action.type) {
    case GET_ALL_DATASET_QUERIES:
      return {
        ...state,
        allQueries: {
          ...state.allQueries,
          dataset: action.dataset
        }
      }
    case UPDATE_SELECTED_QUERY:
      // If action.params is null, only update the query type
      const datasetParams = (action.params && action.queryType === 'dataset') ?
        action.params : state.selected.dataset;
      const uploadParams = (action.params && action.queryType === 'upload') ?
        action.params : state.selected.upload;
      return {
        ...state,
        selected: {
          type: action.queryType,
          dataset: datasetParams,
          upload: uploadParams,
        }
      }
    default:
      return state;
  }
}