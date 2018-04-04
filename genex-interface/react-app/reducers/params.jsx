import { LOAD_AND_GROUP_DATASET, GET_ALL_DATASETS, GET_ALL_DISTANCES, UPDATE_OPERATOR } from '../actions/actionTypes'

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
            current: 'kbest',
            'kbest': {k: 1},
        }
    },
    action) => {
    switch (action.type) {
        case GET_ALL_DATASETS:
            return Object.assign({}, state, {
                allDatasets: action.allDatasets
            });
        case GET_ALL_DISTANCES:
            return Object.assign({}, state, {
                allDistances: action.allDistances
            });
        case LOAD_AND_GROUP_DATASET:
            let newState = Object.assign({}, state, {
                isGrouping: action.isGrouping
            });
            
            if (!action.isGrouping) {
                // Search and include dataset name into action.dataset object
                let datasetID = action.dataset.ID;
                let datasetInfo = state.allDatasets
                                       .filter(ds => (ds.ID === datasetID));
                
                let datasetName = datasetInfo.length > 0 ? datasetInfo[0].name : '';
                action.dataset.name = datasetName;
                
                newState = Object.assign(newState, {
                    dataset: action.dataset,
                    distance: action.distance,
                    st: action.st,
                    groups: action.groups
                });
            }
            return newState;
        case UPDATE_OPERATOR:
            let operator = Object.assign({}, state.operator, {
                current: action.currentOperator,
                [action.currentOperator]: action.params
            });
            return Object.assign({}, state, {
                operator: operator
            })

        default:
            return state;
    }
}