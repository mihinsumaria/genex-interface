import {
  LOAD_AND_GROUP_DATASET,
  GET_ALL_DATASETS,
  GET_ALL_DISTANCES,
  UPDATE_OPERATOR
} from '../actions/actionTypes';

export default (
  state = {
    allDatasets: [],
    allDistances: [],
    dataset: {
      ID: '',
      name: '',
      count: 0,
      length: 0,
      subseq: 0
    },
    distance: '',
    st: 0.3,
    isGrouping: false,
    groups: {
      count: 0,
      density: '',
    },
    operator: {
      current: 'ksim',
      ksim: { k: 1 },
    }
  },
  action) => {
  switch (action.type) {
    case GET_ALL_DATASETS:
      return {
        ...state,
        allDatasets: action.allDatasets
      };
    case GET_ALL_DISTANCES:
      return {
        ...state,
        allDistances: action.allDistances
      };
    case LOAD_AND_GROUP_DATASET:
      let newState = {
        ...state,
        isGrouping: action.isGrouping
      }

      if (!action.isGrouping) {
        // Search and include dataset name into action.dataset object
        const datasetID = action.dataset.ID;
        const datasetInfo = state.allDatasets
          .filter(ds => (ds.ID === datasetID));

        const datasetName = datasetInfo.length > 0 ? datasetInfo[0].name : '';
        action.dataset.name = datasetName;

        newState = {
          ...newState,
          dataset: action.dataset,
          distance: action.distance,
          st: action.st,
          groups: action.groups
        };
      }
      return newState;
    case UPDATE_OPERATOR:
      let operator = {
        ...state.operator,
        current: action.currentOperator
      };
      if (action.params) {
        operator[operator.current] = action.params;
      }
      return {
        ...state,
        operator: operator
      };
    default:
      return state;
  }
}