import * as APIUtil from '../util/session_api_util';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
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

//
// export const login = user => dispatch => {
//   return APIUtil.login(user)
//     .then(response => {
//       return dispatch(receiveCurrentUser(response))
//       },
//       err => {
//         return dispatch(receiveErrors(err.responseJSON))
//       }
//     )
// }

export const fetchUser = () => dispatch => {
  dispatch(requestUser());
  return APIUtil.fetchUser()
    .then( response => {
      return dispatch(receiveCurrentUser(response.data))
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
}

export const logOut = () => {
  return (dispatch) => {
    return APIUtil.logOut()
    .then( () => {
      return dispatch(receiveCurrentUser(null));
    });
  };
};
