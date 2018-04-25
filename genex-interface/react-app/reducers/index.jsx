import { combineReducers } from 'redux';

import params from './params';
import query from './query';
import result from './result';
export default combineReducers({
  params
  , query
  , result
});