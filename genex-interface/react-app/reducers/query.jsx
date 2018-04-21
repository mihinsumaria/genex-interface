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
      };
    case UPDATE_SELECTED_QUERY:
      let selected = {
        ...state.selected,
        type: action.queryType
      };
      if (action.params) {
        selected[selected.type] = action.params;
      }
      return {
        ...state,
        selected: selected
      };
    default:
      return state;
  }
}