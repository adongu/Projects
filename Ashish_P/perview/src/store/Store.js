import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const ConfigureStore = (preLoadedState = {}) => {
  const store = createStore(
    rootReducer,
    preLoadedState,
    applyMiddleware(thunk)
  );

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('../reducers/rootReducer', () => {
        store.replaceReducer(rootReducer)
      })
    }
  }

  return store
};

export default ConfigureStore;
