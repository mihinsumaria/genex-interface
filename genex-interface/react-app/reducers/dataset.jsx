import { LOAD_AND_GROUP_DATASET } from '../actions/actionTypes'

export default (
    state = {
        currentDataset: '',  // name of the loaded and grouped dataset
        isGrouping: false    // the app is grouping a dataset
    },
    action
) => {
    switch (action.type) {
        case LOAD_AND_GROUP_DATASET:
            return Object.assign({}, state, {
                currentDataset: action.dataset,
                isGrouping: action.isGrouping
            });
        default:
            return state;
    }
}