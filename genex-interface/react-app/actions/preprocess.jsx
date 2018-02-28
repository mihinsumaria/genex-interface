import { LOAD_AND_GROUP_DATASET } from './actionTypes'

/**
 * Make request for loading and grouping data. When the response returns,
 * {@link loadAndGroupDataset} is called.
 * @param {string} dataset id of a dataset to load and group.
 * @param {string} distance id of a distance used in grouping.
 * @param {number} st similarity threshold.
 */
const requestLoadAndGroupDataset = (dataset, distance, st) => {
    return (dispatch) => {
        dispatch(loadAndGroupDataset(true));
        // Make AJAX call here
        dispatch(loadAndGroupDataset(false, dataset, distance, st));
    }
}

/**
 * If isGrouping is true, other params are optional. Otherwise, these params
 * are used to update the current state of the app.
 * @param {bool} isGrouping indicate grouping is in progress.
 * @param {string} [dataset] name of the grouped dataset.
 * @param {string} [distance] distance used in grouping.
 * @param {number} [st] similarity threshold used in grouping.
 */
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
