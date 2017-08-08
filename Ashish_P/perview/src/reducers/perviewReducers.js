import { merge } from 'lodash';
import { REQUEST_LOADING, CREATE_PERVIEW, EDIT_PERVIEW, DELETE_PERVIEW, LIKE_PERVIEW, UNLIKE_PERVIEW, BOOKMARK_PERVIEW, UNBOOKMARK_PERVIEW } from '../actions/search_item_actions';

const _nullResults = Object.freeze({
  requestLoading: false,
  allPerviews: [],
  myPerviews: [],
  favoritePerviews: [],
  friendPerviews: [],
  errors: []
})

const searchReducer = (oldState = _nullResults, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState)

  switch (action.type) {
    case REQUEST_LOADING:
      return Object.assign({}, oldState, {
        requestLoading: true
      });
    case RECEIVE_MY_PERVIEW:
      let perview = action.perview;
      newState.allPerviews.unshift(perview);
      newState.myPerviews.unshift(perview);
      return Object.assign({}, newState, { errors: []});
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
