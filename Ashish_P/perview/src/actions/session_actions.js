import * as APIUtil from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

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

export const fetchuser = () => dispatch => {
  console.log('hit action');
  APIUtil.fetchUser()
    .then( response => {
      console.log('hit response');
      return dispatch(receiveCurrentUser(response))
    },
    err => {
      console.log('hit error');
      return dispatch(receiveErrors(err.responseJSON))
    })
}

// export const logout = () => {
//   return (dispatch) => {
//     return APIUtil.logout()
//     .then( () => {
//       return dispatch(receiveCurrentUser(null));
//     });
//   };
// };
