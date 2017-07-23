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


export const login = user => dispatch => {
  return APIUtil.login(user)
    .then(response => {
      console.log(response.data);
      return dispatch(receiveCurrentUser(response.data))

      },
      err => {
        console.log(err.responseJSON);
        return dispatch(receiveErrors(err.responseJSON))
      }
    )
}

// export const logout = () => {
//   return (dispatch) => {
//     return APIUtil.logout()
//     .then( () => {
//       return dispatch(receiveCurrentUser(null));
//     });
//   };
// };