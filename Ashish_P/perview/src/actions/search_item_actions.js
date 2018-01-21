import * as APIUtil from '../util/search_item_api_util';

export const REQUEST_ITEM_RESULTS = 'REQUEST_ITEM_RESULTS';
export const RECEIVE_ITEM_RESULTS = 'RECEIVE_ITEM_RESULTS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const requestResults = () => ({
  type: REQUEST_ITEM_RESULTS
})

const receiveItemResults = (results) => ({
  type: RECEIVE_ITEM_RESULTS,
  results
});

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const fetchItemResults = (searchQuery) => dispatch => {
  dispatch(requestResults());
  const {url, keywords} = keywordsURISeperator(searchQuery)

  return APIUtil.fetchItemResults(keywords)
    .then( response => {
      return dispatch(receiveItemResults(response.data))
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
    .then(() => {
      APIUtil.fetchMetaData(url)
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON))
    })
}

/**
 * @param keywords type string
 * @return {url: '', keywords: ''}
**/
const keywordsURISeperator = (searchQuery) => {
  let urls = [];
  let keywordsArr = [];

  searchQuery.split(' ').forEach((keyword) => {
    if (keyword.indexOf('http://') === 0 || keyword.indexOf('https://') === 0) {
      urls.push(keyword);
    } else {
      keywordsArr.push(keyword);
    }
  })
  const url = urls[0];
  const keywords = keywordsArr.join(" ");

  return {url, keywords}
}
