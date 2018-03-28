import { LOAD_AND_GROUP_DATASET, GET_ALL_DATASETS, GET_ALL_DISTANCES } from '../actions/actionTypes'

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
    },
    action
) => {
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
            let datasetID = action.datasetID
            let datasetInfo = state.allDatasets
                                   .filter(ds => (ds.ID === datasetID));
            
            let datasetName = datasetInfo.length > 0 ? datasetInfo[0].name : '';
            let dataset = Object.assign({}, state.dataset, {
                ID: datasetID,
                name: datasetName
            })
            if (!action.isGrouping) {
                newState = Object.assign(newState, {
                    dataset: dataset,
                    distance: action.distance,
                    st: action.st,
                });
            }
            return newState;
        default:
            return state;
    }
}