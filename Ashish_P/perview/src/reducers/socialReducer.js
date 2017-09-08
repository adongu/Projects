// LIKE_PERVIEW, UNLIKE_PERVIEW, BOOKMARK_PERVIEW, UNBOOKMARK_PERVIEW,
import { merge } from 'lodash';
import { FETCHING_UPDATE, FINISH_UPDATE, RECEIVE_ERRORS } from '../actions/social_actions';

const _nullSocial = Object.freeze({
  fetchingUpdate: false,
  errors: []
})

const sessionReducer = (oldState = _nullSocial, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case FETCHING_UPDATE:
      return Object.assign({}, oldState, {
        fetchingUpdate: true,
        errors: []
      });
    case FINISH_UPDATE:
      return Object.assign({}, oldState, {
        fetchingUpdate: false,
        errors: []
      });
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
