import {
	LOAD_RESULTS,
} from '../actions/actionTypes'

export default (
	state = {
		result: {
			isWorking: false,
			ksim: [],
		}
	}, 
	action) => {
	switch(action.type) {
	case LOAD_RESULTS:
      let newResult = {
        ...state.result,
        isWorking: action.isWorking
      }

      if(!action.isWorking) {
        newResult = {
          ...newResult,
          ksim: action.ksim
        };
      }
      let newState = {
        ...state,
        result: newResult
      }
      return newState;
    default:
      return state;	
	}
}