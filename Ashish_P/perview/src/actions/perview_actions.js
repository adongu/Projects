import * as APIUtil from '../util/perview_api_util';

export const REQUEST_LOADING = 'REQUEST_LOADING';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const RECEIVE_PERVIEW = 'RECEIVE_PERVIEW';
export const RECEIVE_EDIT_PERVIEW = 'EDIT_PERVIEW';
export const DELETE_PERVIEW = 'DELETE_PERVIEW';
export const RECEIVE_LANDING_PERVIEWS = 'RECEIVE_LANDING_PERVIEWS';
export const RECEIVE_ALL_PERVIEWS = 'RECEIVE_ALL_PERVIEWS';
export const RECEIVE_ITEM_PERVIEWS = 'RECEIVE_ITEM_PERVIEWS';
export const RECEIVE_MY_PERVIEWS = 'RECEIVE_MY_PERVIEWS';
export const RECEIVE_FAVORITE_PERVIEWS = 'RECEIVE_FAVORITE_PERVIEWS';
export const RECEIVE_FRIEND_PERVIEWS = 'RECEIVE_FRIEND_PERVIEWS';
export const RECEIVE_SOLICIT_PERVIEWS = 'RECEIVE_SOLICIT_PERVIEWS';
export const RECEIVE_NUM_PERVIEWS = 'RECEIVE_NUM_PERVIEWS';
export const RECEIVE_CATEGORY_IDS = 'RECEIVE_CATEGORY_IDS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';


export const requestLoading = () => ({
  type: REQUEST_LOADING
})

export const receiveItem = (item) => ({
  type: RECEIVE_ITEM,
  item
});

export const receivePerview = (perviewObj) => ({
  type: RECEIVE_PERVIEW,
  perviewObj
});

export const receiveEditPerview = (perview) => ({
  type: RECEIVE_EDIT_PERVIEW,
  perview
});

export const receiveDeletePerview = (perviewId) => ({
  type: DELETE_PERVIEW,
  perviewId
})

export const receiveLandingPerviews = (landingPerviews) => ({
  type: RECEIVE_LANDING_PERVIEWS,
  landingPerviews
});

export const receiveAllPerviews = (allPerviews) => ({
  type: RECEIVE_ALL_PERVIEWS,
  allPerviews
});

export const receiveItemPerviews = (itemPerviews) => ({
  type: RECEIVE_ITEM_PERVIEWS,
  itemPerviews
});

export const receiveMyPerviews = (myPerviews) => ({
  type: RECEIVE_MY_PERVIEWS,
  myPerviews
});

export const receiveFavoritePerviews = (favoritePerviews) => ({
  type: RECEIVE_FAVORITE_PERVIEWS,
  favoritePerviews
});

export const receiveFriendPerviews = (friendPerviews) => ({
  type: RECEIVE_FRIEND_PERVIEWS,
  friendPerviews
});

export const receiveSolicitPerviews = (solicitPerviews) => ({
  type: RECEIVE_SOLICIT_PERVIEWS,
  solicitPerviews
});

export const receiveNumPerviews = (numPerviews) => ({
  type: RECEIVE_NUM_PERVIEWS,
  numPerviews
});

export const receiveCategoryIds = (categoryIds) => ({
  type: RECEIVE_CATEGORY_IDS,
  categoryIds
});

export const receiveComment = (perviewId, commentObject) => ({
  type: CREATE_COMMENT,
  perviewId,
  commentObject
});

export const removeComment = (perviewId, commentId) => ({
  type: DELETE_COMMENT,
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

export const createPerview = (submitPerviewObject) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.createPerview(submitPerviewObject)
    .then( response => {
      console.log('create pervie data', response.data);
      return dispatch(receivePerview(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const editPerview = (formData) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.editPerview(formData)
    .then( response => {
      return dispatch(receiveEditPerview(formData));
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const deletePerview = (perviewId) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.deletePerview(perviewId)
    .then( response => {
      return dispatch(receiveDeletePerview(perviewId))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const createItem = (item) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.createItem(item)
    .then( response => {
      return dispatch(receiveItem(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchLandingPerviews = () => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchLandingPerviews()
    .then( response => {
      return dispatch(receiveLandingPerviews(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchAllPerviews = (categoryId) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchAllPerviews(categoryId)
    .then( response => {
      return dispatch(receiveAllPerviews(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchItemPerviews = (itemId = null) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchItemPerviews(itemId)
    .then( response => {
      return dispatch(receiveItemPerviews(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchMyPerviews = (categoryId) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchMyPerviews(categoryId)
    .then( response => {
      return dispatch(receiveMyPerviews(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchFavoritePerviews = (categoryId) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchFavoritePerviews(categoryId)
    .then( response => {
      return dispatch(receiveFavoritePerviews(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchFriendPerviews = (friendUserId, categoryId) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchFriendPerviews(friendUserId, categoryId)
    .then( response => {
      return dispatch(receiveFriendPerviews(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchSolicitPerviews = (solicitPerviewId) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchSolicitPerviews(solicitPerviewId)
    .then( response => {
      return dispatch(receiveSolicitPerviews(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchNumPerviews = () => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchNumPerviews()
    .then( response => {
      return dispatch(receiveNumPerviews(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchCategoryIds = () => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchCategoryIds()
    .then( response => {
      return dispatch(receiveCategoryIds(response.data))
    })
    .catch( error => {
      return dispatch(receiveErrors(error))
    })
};

export const createComment = ({ perviewId = null, comment = '' }) => dispatch => {
  // dispatch(fetchingUpdate());
  return APIUtil.createComment(perviewId, comment)
    .then(response => {
      console.log('response', response.data);
      return dispatch(receiveComment(perviewId, response.data))
    })
    .catch(error => {
      // dispatch(finishUpdate());
      return dispatch(receiveErrors(error));
    })
}

export const deleteComment = ({ perviewId = null, commentId = null }) => dispatch => {
  // dispatch(fetchingUpdate());
  return APIUtil.deleteComment(perviewId, commentId)
    .then(response => {
      return dispatch(removeComment(perviewId, commentId))
    })
    .catch(error => {
      // dispatch(finishUpdate());
      return dispatch(receiveErrors(error));
    })
}
