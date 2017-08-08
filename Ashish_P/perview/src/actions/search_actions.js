import * as APIUtil from '../util/search_api_util';

export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const requestResults = () => ({
  type: REQUEST_RESULTS
})

const receiveResults = (results) => ({
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

export const fetchresults = (keywords) => dispatch => {
  dispatch(requestResults());
  return APIUtil.fetchResults(keywords)
    .then( response => {
      return dispatch(receiveResults(response.data))
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
}
