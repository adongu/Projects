export const LIKE_PERVIEW = 'LIKE_PERVIEW';
export const UNLIKE_PERVIEW = 'UNLIKE_PERVIEW';
export const BOOKMARK_PERVIEW = 'BOOKMARK_PERVIEW';
export const UNBOOKMARK_PERVIEW = 'UNBOOKMARK_REVIEW';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

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
