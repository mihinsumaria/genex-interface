import { GET_ALL_DATASET_QUERIES, SELECT_QUERY } from '../actions/actionTypes'

export default (
	state = {
		allQueries: {
			dataset: [],
			upload: {

			}
		},
		selected: {
			type: 'dataset',
			index: 0,
			start: 0,
			end: 100
		}
	},
	action) => {
	switch (action.type) {
		case GET_ALL_DATASET_QUERIES:
			let allQueries = Object.assign({}, state.allQueries, {
				dataset: action.dataset
			});
			return Object.assign({}, state, {
				allQueries: allQueries
			});
		case SELECT_QUERY:
			return Object.assign({}, state, {
				selected: action.selected
			});
		default:
			return state;
	}
}