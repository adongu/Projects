import { merge } from 'lodash';
import { REQUEST_USER, RECEIVE_CURRENT_USER, SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL, RECEIVE_ERRORS } from '../actions/session_actions';

const _nullSession = Object.freeze({
  isFetching: false,
  currentUser: null,
  showLoginModal: false,
  errors: []
})

const sessionReducer = (oldState = _nullSession, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, oldState, {
        isFetching: true
      })
    case RECEIVE_CURRENT_USER:
      let currentUser = action.currentUser;
      let newState = Object.assign({}, oldState, {
        isFetching: false,
        currentUser: currentUser,
        errors: []
      });
      return newState;
    case RECEIVE_ERRORS:
      let errors = action.errors;
      return Object.assign({}, oldState, {
        errors: errors
      })
    case SHOW_LOGIN_MODAL:
      return Object.assign({}, oldState, {
        showLoginModal: true
      })
    case SHOW_LOGIN_MODAL:
      console.log('hit SHOW_LOGIN_MODAL');
      return Object.assign({}, oldState, {
        showLoginModal: true
      })
    case HIDE_LOGIN_MODAL:
      console.log('hit HIDE_LOGIN_MODAL');
      return Object.assign({}, oldState, {
        showLoginModal: false
      })
    default:
      return merge(oldState, { errors: []})
  }
};

export default sessionReducer;
