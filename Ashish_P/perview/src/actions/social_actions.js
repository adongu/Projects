import * as APIUtil from '../util/social_api_util';

export const LIKE_PERVIEW = 'LIKE_PERVIEW';
export const UNLIKE_PERVIEW = 'UNLIKE_PERVIEW';
export const BOOKMARK_PERVIEW = 'BOOKMARK_PERVIEW';
export const UNBOOKMARK_PERVIEW = 'UNBOOKMARK_REVIEW';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});


export const likePerview = (perviewId = null) => dispatch => {
  return APIUtil.likePerview(perviewId)
    .then(response => {
    })
    .catch(error => {
      return dispatch(receiveErrors(error));
    })
}

export const unlikePerview = (perviewId = null) => dispatch => {
  return APIUtil.unlikePerview(perviewId)
    .then(response => {
    })
    .catch(error => {
      return dispatch(receiveErrors(error));
    })
}

export const bookmarkPerview = (perviewId) => dispatch => {
  return APIUtil.bookmarkPerview(perviewId)
    .then(response => {
    })
    .catch(error => {
      return dispatch(receiveErrors(error));
    })
}

export const unbookmarkPerview = (perviewId) => dispatch => {
  return APIUtil.unbookmarkPerview(perviewId)
    .then(response => {
    })
    .catch(error => {
      return dispatch(receiveErrors(error));
    })
}
