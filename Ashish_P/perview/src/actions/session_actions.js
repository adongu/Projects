import * as APIUtil from '../util/session_api_util';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const requestUser = () => ({
  type: REQUEST_USER
})

export const fetchToken = () => dispatch => {
  return APIUtil.fetchToken()
    .then( response => {
    })
}

export const showLoginModal =() => ({
  type: SHOW_LOGIN_MODAL
})

export const hideLoginModal =() => ({
  type: HIDE_LOGIN_MODAL
})

export const logIn = () => dispatch => {
  dispatch(requestUser());
  return APIUtil.logIn()
    .then( response => {
      return dispatch(receiveCurrentUser(response.data))
    })
    .catch((error) => {
      return dispatch(receiveErrors(error))
    });
}

export const fetchUser = () => dispatch => {
  dispatch(requestUser());
  return APIUtil.fetchUser()
    .then( response => {
      return dispatch(receiveCurrentUser(response.data))
    })
    .catch((error) => {
      return dispatch(receiveErrors(error))
      // return Promise.resolve('no user');
      // return Promise.reject('response failed no user')
    });
}

export const logOut = () => {
  return (dispatch) => {
    return APIUtil.logOut()
    .then((response) => {
      return dispatch(receiveCurrentUser(null));
    })
    .catch((error) => {
    })
  };
};
