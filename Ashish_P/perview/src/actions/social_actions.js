import * as APIUtil from '../util/social_api_util';

export const FETCHING_UPDATE = 'FETCHING_UPDATE';
export const FINISH_UPDATE = 'FINISH_UPDATE';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const LIKE_PERVIEW = 'LIKE_PERVIEW';
export const UNLIKE_PERVIEW = 'UNLIKE_PERVIEW';
export const BOOKMARK_PERVIEW = 'BOOKMARK_PERVIEW';
export const UNBOOKMARK_PERVIEW = 'UNBOOKMARK_REVIEW';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const fetchingUpdate = () => ({
  type: FETCHING_UPDATE
});

export const finishUpdate = (perviewId, socialType) => ({
  type: FINISH_UPDATE,
  perviewId,
  socialType
});

export const receiveComment = (commentId, comment) => ({
  type: RECEIVE_ERRORS,
  commentId,
  comment
});

export const removeComment = (perviewId, commentId) => ({
  type: RECEIVE_ERRORS,
  perviewId,
  commentId
});

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});



export const createComment = (perviewId = null, comment = '') => dispatch => {
  dispatch(fetchingUpdate());
  return APIUtil.createComment(perviewId, comment)
    .then(response => {
      // dispatch(finishUpdate(perviewId, 'like'));
      return dispatch(receiveComment(perviewId, comment))
    })
    .catch(error => {
      dispatch(finishUpdate());
      return dispatch(receiveErrors(error));
    })
}

export const deleteComment = (perviewId = null, commentId = null) => dispatch => {
  dispatch(fetchingUpdate());
  return APIUtil.deleteComment(perviewId, commentId)
    .then(response => {
      // dispatch(finishUpdate(perviewId, 'like'));
      return dispatch(removeComment(perviewId, commentId))
    })
    .catch(error => {
      dispatch(finishUpdate());
      return dispatch(receiveErrors(error));
    })
}

export const likePerview = (perviewId = null) => dispatch => {
  dispatch(fetchingUpdate());
  return APIUtil.likePerview(perviewId)
    .then(response => {
      dispatch(finishUpdate(perviewId, 'like'));
    })
    .catch(error => {
      dispatch(finishUpdate());
      return dispatch(receiveErrors(error));
    })
}

export const unlikePerview = (perviewId = null) => dispatch => {
  dispatch(fetchingUpdate());
  return APIUtil.unlikePerview(perviewId, 'like')
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
      dispatch(finishUpdate(perviewId, 'bookmark'));
    })
    .catch(error => {
      dispatch(finishUpdate());
      return dispatch(receiveErrors(error));
    })
}

export const unbookmarkPerview = (perviewId) => dispatch => {
  dispatch(fetchingUpdate());
  return APIUtil.unbookmarkPerview(perviewId, 'bookmark')
    .then(response => {
      dispatch(finishUpdate());
    })
    .catch(error => {
      dispatch(finishUpdate());
      return dispatch(receiveErrors(error));
    })
}
