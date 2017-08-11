import * as APIUtil from '../util/perview_api_util';

export const REQUEST_LOADING = 'REQUEST_LOADING';
export const RECEIVE_ALL_PERVIEWS = 'RECEIVE_ALL_PERVIEWS';
export const RECEIVE_MY_PERVIEWS = 'RECEIVE_MY_PERVIEWS';
export const RECEIVE_FAVORITE_PERVIEWS = 'RECEIVE_FAVORITE_PERVIEWS';
export const RECEIVE_FRIEND_PERVIEWS = 'RECEIVE_FRIEND_PERVIEWS';
export const EDIT_PERVIEW = 'EDIT_PERVIEW';
export const DELETE_PERVIEW = 'DELETE_PERVIEW';
export const LIKE_PERVIEW = 'LIKE_PERVIEW';
export const UNLIKE_PERVIEW = 'UNLIKE_PERVIEW';
export const BOOKMARK_PERVIEW = 'BOOKMARK_PERVIEW';
export const UNBOOKMARK_PERVIEW = 'UNBOOKMARK_REVIEW';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';


export const requestLoading = () => ({
  type: REQUEST_LOADING
})

export const receiveMyPerview = (perview) => ({
  type: RECEIVE_MY_PERVIEW,
  perview
});

export const editPerview = () => ({
  type: EDIT_PERVIEW
})

export const deletePerview = (perview) => ({
  type: DELETE_PERVIEW,
  perview
})

export const likePerview = () => ({
  type: LIKE_PERVIEW
})

export const unlikePerview = () => ({
  type: UNLIKE_PERVIEW
})

export const bookmarkPerview = () => ({
  type: BOOKMARK_PERVIEW
})

export const unbookmarkPerview = () => ({
  type: UNBOOKMARK_PERVIEW
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
