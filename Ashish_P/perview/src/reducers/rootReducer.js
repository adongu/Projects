import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  find: searchReducer
});

export default rootReducer;
