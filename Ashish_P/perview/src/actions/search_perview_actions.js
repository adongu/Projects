import * as APIUtil from '../util/search_perview_api_util';

export const REQUEST_PERVIEW_RESULTS = 'REQUEST_PERVIEW_RESULTS';
export const RECEIVE_PERVIEW_RESULTS = 'RECEIVE_PERVIEW_RESULTS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const requestResults = () => ({
  type: REQUEST_PERVIEW_RESULTS
})

const receivePerviewResults = (results) => ({
  type: RECEIVE_PERVIEW_RESULTS,
  results
});

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const fetchPerviewResults = (keywords) => dispatch => {
  dispatch(requestResults());
  return APIUtil.fetchPerviewResults(keywords)
    .then( response => {
      return dispatch(receivePerviewResults(response.data))
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
}
