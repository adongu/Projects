import { merge } from 'lodash';
import { REQUEST_RESULTS, RECEIVE_RESULTS, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/search_perview_actions';

const _nullResults = Object.freeze({
  isFetching: false,
  perviewResults: [],
  errors: []
})

const searchPerviewReducer = (oldState = _nullResults, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case REQUEST_RESULTS:
      return Object.assign({}, oldState, {
        isFetching: true
      });
    case RECEIVE_RESULTS:
      let results  = Object.keys(action.results).map(function(key) {
        return action.results[key][0];
      });
      return Object.assign({}, oldState, {
        perviewResults: results,
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

export default searchPerviewReducer;
