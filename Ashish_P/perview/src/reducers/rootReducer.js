import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import searchItemReducer from './searchItemReducer';
import searchPerviewReducer from './searchPerviewReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  findItem: searchItemReducer,
  findPerview: searchPerviewReducer,
});

export default rootReducer;
