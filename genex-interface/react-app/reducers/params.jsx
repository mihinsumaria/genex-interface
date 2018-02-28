import { LOAD_AND_GROUP_DATASET, GET_ALL_DATASETS } from '../actions/actionTypes'

export default (
    state = {
        allDatasets: [],
        allDistances: ['euclidean', 'manhattan'],
        dataset: '',
        distance: '',
        st: 0.3,
        isGrouping: false
    },
    action
) => {
    switch (action.type) {
        case GET_ALL_DATASETS:
            return Object.assign({}, state, {
                allDatasets: action.allDatasets
            });
        case LOAD_AND_GROUP_DATASET:
            let newState = Object.assign({}, state, {
                isGrouping: action.isGrouping
            });
            if (!action.isGrouping) {
                newState = Object.assign(newState, {
                    dataset: action.dataset,
                    distance: action.distance,
                    st: action.st,
                });
            }
            return newState;
        default:
            return state;
    }
}