import * as APIUtil from '../util/search_item_api_util';

export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const requestResults = () => ({
  type: REQUEST_RESULTS
})

const receiveItemResults = (results) => ({
  type: RECEIVE_RESULTS,
  results
});

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const fetchItemResults = (keywords) => dispatch => {
  dispatch(requestResults());
  return APIUtil.fetchItemResults(keywords)
    .then( response => {
      console.log(response.data);
      return dispatch(receiveItemResults(response.data))
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
}
