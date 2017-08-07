import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from '../actions/session_actions';

const _nullUser = Object.freeze({
  currentUser: null,
  errors: []
})

const sessionReducer = (oldState = _nullUser, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      let currentUser = action.currentUser;
      return merge({}, oldState, { currentUser: currentUser });
    case RECEIVE_ERRORS:
      let errors = action.errors;
      return Object.assign({}, oldState, { errors: errors })
    default:
      return merge(oldState, { errors: []})
  }
};

export default sessionReducer;
