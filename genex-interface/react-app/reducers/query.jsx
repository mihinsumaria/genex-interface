import {
  UPDATE_ALL_QUERIES,
  UPDATE_SELECTED_QUERY,
  UPDATE_SELECTED_QUERY_RAW_DATA
} from '../actions/actionTypes'

export default (
  state = {
    allQueries: {
      dataset: [],
      upload: [],
    },
    selected: {
      type: 'dataset',
      dataset: {
        index: -1,
        start: -1,
        end: -1,
      },
      upload: {
        index: -1,
        start: -1,
        end: -1,
      },
    },
    selectedRaw: {
      isLoading: false,
      dataset: [],
      upload: [],
    }
  },
  action) => {
  switch (action.type) {
    case UPDATE_ALL_QUERIES:
      return {
        ...state,
        allQueries: {
          ...state.allQueries,
          [action.queryType]: action.queries
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
    case UPDATE_SELECTED_QUERY_RAW_DATA:
      if (!action.queryType) {
        return {
          ...state,
          selectedRaw: {
            ...state.selectedRaw,
            isLoading: true
          }
        }
      }
      return {
        ...state,
        selectedRaw: {
          ...state.selectedRaw,
          isLoading: false,
          [action.queryType]: action.raw
        }
      }
    default:
      return state;
  }
}