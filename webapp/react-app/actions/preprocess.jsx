import { LOAD_AND_GROUP_DATASET } from './actionTypes'

const requestLoadAndGroupDataset = dataset => {
    return (dispatch) => {
        dispatch(loadAndGroupDataset(dataset, true));
    }
}

const loadAndGroupDataset = (dataset, isGrouping) => {
    return {
        type: LOAD_AND_GROUP_DATASET,
        dataset,
        isGrouping
    }
}

export { requestLoadAndGroupDataset, loadAndGroupDataset };
