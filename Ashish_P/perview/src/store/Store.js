import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const ConfigureStore = (preLoadedState = {}) => {
  return createStore(
    rootReducer,
    preLoadedState,
    applyMiddleware(thunk)
  );
};

export default ConfigureStore;
