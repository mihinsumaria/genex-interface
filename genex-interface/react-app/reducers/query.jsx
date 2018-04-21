import {
  GET_ALL_DATASET_QUERIES,
  UPDATE_SELECTED_QUERY,
  UPDATE_QUERY_DATA
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
        index: -1,
        start: -1,
        end: -1,
      },
      upload: {
      },
    },
    data: {
      dataset: [],
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
    case UPDATE_QUERY_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [action.queryType]: action.data
        }
      }
    default:
      return state;
  }
}