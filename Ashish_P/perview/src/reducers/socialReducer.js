// LIKE_PERVIEW, UNLIKE_PERVIEW, BOOKMARK_PERVIEW, UNBOOKMARK_PERVIEW,
import { merge } from 'lodash';
import { REQUEST_USER, RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from '../actions/session_actions';

const _nullSocial = Object.freeze({
  errors: []
})

const sessionReducer = (oldState = _nullSocial, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ERRORS:
      let errors = action.errors;
      return Object.assign({}, oldState, {
        errors: errors
      })
    default:
      return merge(oldState, { errors: []})
  }
};

export default sessionReducer;
