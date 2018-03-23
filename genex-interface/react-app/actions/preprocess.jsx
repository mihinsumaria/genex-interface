import { LOAD_AND_GROUP_DATASET, GET_ALL_DATASETS, GET_ALL_DISTANCES } from './actionTypes'

/** Makes request for a list of all datasets */
const requestGetAllDatasets = () => {
    return (dispatch) => {
        // TODO: add report here if error occurs
        fetch('/datasets')
        .then( response => (response.json()))
        .then( result => {
            dispatch(getAllDatasets(result));
        })
    }
}

/** Updates the app state with the returned list of datasets */
const getAllDatasets = (allDatasets) => ({
    type: GET_ALL_DATASETS,
    allDatasets
})

const requestGetAllDistances = () => {
    return (dispatch) => {
        // TODO: add report here if error occurs
        fetch('/distances')
        .then( response => (response.json()))
        .then( result => {
            dispatch(getAllDistances(result));
        })
    }
}

/** Updates the app state with the returned list of datasets */
const getAllDistances = (allDistances) => ({
    type: GET_ALL_DISTANCES,
    allDistances
})

/**
 * Makes request for loading and grouping data. When the response returns,
 * {@link loadAndGroupDataset} is called.
 * @param {string} dataset id of a dataset to load and group.
 * @param {string} distance id of a distance used in grouping.
 * @param {number} st similarity threshold.
 */
const requestLoadAndGroupDataset = (dataset, distance, st) => {
    return (dispatch) => {
        dispatch(loadAndGroupDataset(true));
        // Make AJAX call here
        var formData = new FormData();

        formData.append('dataset', dataset);
        formData.append('distance', distance);
        formData.append('st', st);

        fetch('/preprocess', {
            method: 'post',
            body: formData
        })
        .then(response => (response.json()))
        .then(json => {
            dispatch(loadAndGroupDataset(
                false, 
                dataset,
                distance,
                st,
                json.count,
                json.length,
                json.subseq,
                json.groups
                )
            )
        })
        .catch(err => {
            console.log('error: ',err)
        })
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
const loadAndGroupDataset = (isGrouping
                             , dataset
                             , distance
                             , st
                             , count
                             , length
                             , subseq
                             , groups) => ({
    type: LOAD_AND_GROUP_DATASET,
    isGrouping,
    dataset,
    distance,
    st,
    count,
    length,
    subseq,
    groups
})

export { requestLoadAndGroupDataset, requestGetAllDatasets, requestGetAllDistances };
