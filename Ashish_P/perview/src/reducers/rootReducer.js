import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import searchItemReducer from './searchItemReducer';
import searchPerviewReducer from './searchPerviewReducer';
import perviewReducer from './perviewReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  findItem: searchItemReducer,
  findPerview: searchPerviewReducer,
  perview: perviewReducer,
});

export default rootReducer;
