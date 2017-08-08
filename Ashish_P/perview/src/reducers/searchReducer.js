import { merge } from 'lodash';
import { REQUEST_RESULTS, RECEIVE_RESULTS, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/search_actions';

const _nullResults = Object.freeze({
  isFetching: false,
  results: null,
  errors: []
})

const searchReducer = (oldState = _nullResults, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case REQUEST_RESULTS:
      return Object.assign({}, oldState, {
        isFetching: true
      });
    case RECEIVE_RESULTS:
      let results = action.results;
      return Object.assign({}, oldState, {
        results: results,
        errors: []
      });
    case RECEIVE_ERRORS:
      let errors = action.errors;
      return Object.assign({}, oldState, {
        errors: errors
      });
    default:
      return merge(oldState, { errors: []});
  }
}

export default searchReducer;
