import {
  LOAD_RESULTS,
  UPDATE_VIZ_TYPE,
  UPDATE_VISIBILITY,
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
      vizType: 'line',
      line: [],
      radial: [],
      bar: 0,
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
            ...newState[action.resultType],
            query: action.frozenQuery,
            result: action.result,
            line: Array(action.result.length).fill(true),
            radial: Array(action.result.length).fill(true),
            bar: 0
          }
        };
      }
      return newState;
    case UPDATE_VIZ_TYPE:
      return {
        ...state,
        [state.type]: {
          ...state[state.type],
          vizType: action.vizType
        }
      };
    case UPDATE_VISIBILITY:
      return {
        ...state,
        [state.type]: {
          ...state[state.type],
          [state[state.type].vizType]: action.visibility
        }
      };
    default:
      return state;	
	}
}