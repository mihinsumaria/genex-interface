import {
	LOAD_RESULTS,
} from '../actions/actionTypes'

export default (
	state = {
    isWorking: false,
    type: 'ksim',
    ksim: {
      query: {
        type: 'dataset',
        name: '',
        index: 0,
        start: 0,
        end: 0,
        raw: []
      },
      result: [],
    },
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
          [action.resultType]: {
            query: action.frozenQuery,
            result: action.result
          }
        };
      }
      return newState;
    default:
      return state;	
	}
}