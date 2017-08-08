import * as APIUtil from '../util/perview_api_util';

export const REQUEST_LOADING = 'REQUEST_LOADING';
export const CREATE_PERVIEW = 'CREATE_PERVIEW';
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

const createPerview = (perview) => ({
  type: RECEIVE_RESULTS,
  perview
});

export const editPerview = () => ({
  type: EDIT_PERVIEW
})

export const deletePerview = (perview) => ({
  type: DELETE_PERVIEW
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

export const createperview = (formData) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.createPerview(formData)
    .then( response => {
      return dispatch(createPerview(response.data))
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
}
