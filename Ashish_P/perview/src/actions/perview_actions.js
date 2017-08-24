import * as APIUtil from '../util/perview_api_util';

export const REQUEST_LOADING = 'REQUEST_LOADING';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const RECEIVE_PERVIEW = 'RECEIVE_PERVIEW';
export const RECEIVE_ALL_PERVIEWS = 'RECEIVE_ALL_PERVIEWS';
export const RECEIVE_ITEM_PERVIEWS = 'RECEIVE_ITEM_PERVIEWS';
export const RECEIVE_MY_PERVIEWS = 'RECEIVE_MY_PERVIEWS';
export const RECEIVE_FAVORITE_PERVIEWS = 'RECEIVE_FAVORITE_PERVIEWS';
export const RECEIVE_FRIEND_PERVIEWS = 'RECEIVE_FRIEND_PERVIEWS';
export const RECEIVE_CATEGORY_IDS = 'RECEIVE_CATEGORY_IDS';
export const EDIT_PERVIEW = 'EDIT_PERVIEW';
export const DELETE_PERVIEW = 'DELETE_PERVIEW';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';


export const requestLoading = () => ({
  type: REQUEST_LOADING
})

export const receiveItem = (item) => ({
  type: RECEIVE_ITEM,
  item
});

export const receivePerview = (perview) => ({
  type: RECEIVE_PERVIEW,
  perview
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

export const receiveCategoryIds = (categoryIds) => ({
  type: RECEIVE_CATEGORY_IDS,
  categoryIds
});

export const editPerview = () => ({
  type: EDIT_PERVIEW
});


export const deletePerview = (perview) => ({
  type: DELETE_PERVIEW,
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
      return dispatch(receivePerview(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const createItem = (item) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.createItem(item)
    .then( response => {
      console.log('action receive item', response.data);
      return dispatch(receiveItem(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchAllPerviews = () => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchAllPerviews()
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

export const fetchMyPerviews = (categoryId = null) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchMyPerviews(categoryId)
    .then( response => {
      return dispatch(receiveMyPerviews(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchFavoritePerviews = (categoryId = null) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchFavoritePerviews(categoryId)
    .then( response => {
      return dispatch(receiveFavoritePerviews(response.data))
    })
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};

export const fetchFriendPerviews = (friendUserId, categoryId = null) => dispatch => {
  dispatch(requestLoading());
  return APIUtil.fetchFriendPerviews(friendUserId, categoryId)
    .then( response => {
      return dispatch(receiveFavoritePerviews(response.data))
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
    .catch( err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
};
