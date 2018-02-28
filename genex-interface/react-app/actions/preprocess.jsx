import { LOAD_AND_GROUP_DATASET } from './actionTypes'

const requestLoadAndGroupDataset = (dataset, distance, st) => {
    return (dispatch) => {
        dispatch(loadAndGroupDataset(true));
        // Make AJAX call here
        dispatch(loadAndGroupDataset(false, dataset, distance, st));
    }
}

const loadAndGroupDataset = (isGrouping, dataset, distance, st) => {
    return {
        type: LOAD_AND_GROUP_DATASET,
        isGrouping,
        dataset,
        distance,
        st,
    }
}

export { requestLoadAndGroupDataset, loadAndGroupDataset };
