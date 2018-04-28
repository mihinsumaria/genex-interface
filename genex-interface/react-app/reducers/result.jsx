import {
	LOAD_RESULTS,
} from '../actions/actionTypes'

export default (
	state = {
    isWorking: false,
    type: 'ksim',
    ksim: [],
    motif: [],
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
          type: action.resultType,   
          [action.resultType]: action.result
        };
      }
      return newState;
    default:
      return state;	
	}
}