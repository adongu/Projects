import * as APIUtil from '../util/perview_api_util';

export const REQUEST_LOADING = 'REQUEST_LOADING';
export const RECEIVE_ALL_PERVIEWS = 'RECEIVE_ALL_PERVIEWS';
export const RECEIVE_MY_PERVIEWS = 'RECEIVE_MY_PERVIEWS';
export const RECEIVE_FAVORITE_PERVIEWS = 'RECEIVE_FAVORITE_PERVIEWS';
export const RECEIVE_FRIEND_PERVIEWS = 'RECEIVE_FRIEND_PERVIEWS';
export const EDIT_PERVIEW = 'EDIT_PERVIEW';
export const DELETE_PERVIEW = 'DELETE_PERVIEW';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';


export const requestLoading = () => ({
  type: REQUEST_LOADING
})

export const receiveAllPerviews = (perviews) => ({
  type: RECEIVE_MY_PERVIEWS,
  perviews
});

export const receiveMyPerviews = (perviews) => ({
  type: RECEIVE_MY_PERVIEWS,
  perviews
});

export const receiveFavoritePerviews = (perviews) => ({
  type: RECEIVE_MY_PERVIEWS,
  perviews
});

export const receiveFriendPerviews = (perviews) => ({
  type: RECEIVE_MY_PERVIEWS,
  perviews
});

export const editPerview = () => ({
  type: EDIT_PERVIEW
})

export const deletePerview = (perview) => ({
  type: DELETE_PERVIEWS,
  perview
})

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const createPerview = (formData) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.createPerview(formData)
    .then( response => {
      return dispatch(receiveMyPerview(response.data))
            .then( () => receiveAllPerview(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
}

export const fetchAllPerviews = (formData) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.createPerview(formData)
    .then( response => {
      return dispatch(receiveMyPerview(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
}
