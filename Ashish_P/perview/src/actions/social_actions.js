import * as APIUtil from '../util/social_api_util';

export const LIKE_PERVIEW = 'LIKE_PERVIEW';
export const UNLIKE_PERVIEW = 'UNLIKE_PERVIEW';
export const BOOKMARK_PERVIEW = 'BOOKMARK_PERVIEW';
export const UNBOOKMARK_PERVIEW = 'UNBOOKMARK_REVIEW';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';


export const unlikePerview = () => ({
  type: UNLIKE_PERVIEW
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


export const likePerview = (perviewId = null) => dispatch => {
  return APIUtil.likePerview(perviewId)
    .then(response => {
      console.log('success liking', response.data);
    })
    .catch(error => {
      console.log('Error', error.responseJSON);
      return dispatch(receiveErrors(error.responseJSON));
    })
}

export const bookmarkPerview = (perviewId) => dispatch => {
  console.log('bookmark action', perviewId);
  return APIUtil.bookmarkPerview(perviewId)
    .then(response => {
      console.log('success bookmarking', response);
    })
    .catch(error => {
      console.log('Error', error.responseJSON);
      return dispatch(receiveErrors(error.responseJSON));
    })
}
