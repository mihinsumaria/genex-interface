import {
	LOAD_RESULTS,
} from '../actions/actionTypes'

export default (
	state = {
			isWorking: false,
			ksim: [],
	}, 
	action) => {
	switch(action.type) {
	case LOAD_RESULTS:
      let newState = {
        ...state,
        isWorking: action.isWorking
      }

      if(!action.isWorking) {
          newState = {
              ...newState,
              ksim: action.ksim
          };
      }
      return newState;
    default:
      return state;	
	}
}