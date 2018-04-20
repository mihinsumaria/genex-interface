import {
	SELECT_QUERY
} from './actionTypes'

const updateSelected = (selected) => ({
	type: SELECT_QUERY
	, selected
})

export {
	updateSelected
};