import { merge } from 'lodash';
import { REQUEST_RESULTS, RECEIVE_RESULTS, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/search_item_actions';

const _nullSearchItem = Object.freeze({
  isFetching: false,
  itemResults: [],
  errors: []
})

const searchItemReducer = (oldState = _nullSearchItem, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case REQUEST_RESULTS:
      return Object.assign({}, oldState, {
        isFetching: true
      });
    case RECEIVE_RESULTS:
      let results = action.results;
      return Object.assign({}, oldState, {
        itemResults: results,
        errors: []
      });
    case RECEIVE_ERRORS:
      let errors = action.errors;
      return Object.assign({}, oldState, {
        errors: errors
      });
    case CLEAR_ERRORS:
      return Object.assign({}, oldState, errors:[]);
    default:
      return merge(oldState, { errors: []});
  }
}

export default searchItemReducer;
