import * as APIUtil from '../util/social_api_util';

export const FETCHING_UPDATE = 'FETCHING_UPDATE';
export const FINISH_UPDATE = 'FINISH_UPDATE';
export const LIKE_PERVIEW = 'LIKE_PERVIEW';
export const UNLIKE_PERVIEW = 'UNLIKE_PERVIEW';
export const BOOKMARK_PERVIEW = 'BOOKMARK_PERVIEW';
export const UNBOOKMARK_PERVIEW = 'UNBOOKMARK_REVIEW';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const fetchingUpdate = () => ({
  type: FETCHING_UPDATE
})

export const finishUpdate = () => ({
  type: FINISH_UPDATE
})

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});



export const likePerview = (perviewId = null) => dispatch => {
  dispatch(fetchingUpdate());
  return APIUtil.likePerview(perviewId)
    .then(response => {
      dispatch(finishUpdate());
    })
    .catch(error => {
      dispatch(finishUpdate());
      return dispatch(receiveErrors(error));
    })
}

export const unlikePerview = (perviewId = null) => dispatch => {
  dispatch(fetchingUpdate());
  return APIUtil.unlikePerview(perviewId)
    .then(response => {
      dispatch(finishUpdate());
    })
    .catch(error => {
      dispatch(finishUpdate());
      return dispatch(receiveErrors(error));
    })
}

export const bookmarkPerview = (perviewId) => dispatch => {
  dispatch(fetchingUpdate());
  return APIUtil.bookmarkPerview(perviewId)
    .then(response => {
      dispatch(finishUpdate());
    })
    .catch(error => {
      dispatch(finishUpdate());
      return dispatch(receiveErrors(error));
    })
}

export const unbookmarkPerview = (perviewId) => dispatch => {
  dispatch(fetchingUpdate());
  return APIUtil.unbookmarkPerview(perviewId)
    .then(response => {
      dispatch(finishUpdate());
    })
    .catch(error => {
      dispatch(finishUpdate());
      return dispatch(receiveErrors(error));
    })
}
