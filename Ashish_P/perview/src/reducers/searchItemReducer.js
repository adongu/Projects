import { merge } from 'lodash';
import { REQUEST_ITEM_RESULTS, RECEIVE_ITEM_RESULTS, RECEIVE_METADATA_RESULTS, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/search_item_actions';

const _nullSearchItem = Object.freeze({
  isFetching: false,
  itemResults: [],
  errors: []
})

const searchItemReducer = (oldState = _nullSearchItem, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case REQUEST_ITEM_RESULTS:
      return Object.assign({}, oldState, {
        isFetching: true
      });
    case RECEIVE_ITEM_RESULTS:
      return Object.assign({}, oldState, {
        itemResults: action.results,
        isFetching: false,
        errors: []
      });
    case RECEIVE_METADATA_RESULTS:
      console.log("RECEIVE_METADATA_RESULTS", action.results);

      return Object.assign({}, oldState, {
        itemResults: [action.results, ...oldState.itemResults],
        isFetching: false,
        errors: []
      });
    case RECEIVE_ERRORS:
      return Object.assign({}, oldState, {
        errors: action.errors
      });
    case CLEAR_ERRORS:
      return Object.assign({}, oldState, { errors: []});
    default:
      return merge(oldState, { errors: []});
  }
}

export default searchItemReducer;
