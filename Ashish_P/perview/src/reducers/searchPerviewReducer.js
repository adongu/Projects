import { merge } from 'lodash';
import { REQUEST_PERVIEW_RESULTS, RECEIVE_PERVIEW_RESULTS, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/search_perview_actions';

const _nullSearchPerview = Object.freeze({
  isFetching: false,
  perviewResults: [],
  amazon: [],
  errors: []
})

const searchPerviewReducer = (oldState = _nullSearchPerview, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case REQUEST_PERVIEW_RESULTS:
      return Object.assign({}, oldState, {
        isFetching: true
      });
    case RECEIVE_PERVIEW_RESULTS:
    // turns result object into an array
      let perviews = action.results.perview;

      let results = Object.keys(perviews).map((key) => {
        if (perviews[key].length === 1) {
          // turns single perview into array for uniform format
          return [perviews[key][0]];
        } else {
          return perviews[key].map((perviewObject) => {
            return perviewObject;
          })
        }
      });

      let newState =  Object.assign({}, oldState, {
        perviewResults: results,
        isFetching: false,
        errors: []
      });
      return newState;
    case RECEIVE_ERRORS:
      let errors = action.errors;
      return Object.assign({}, oldState, {
        errors: errors
      });
    case CLEAR_ERRORS:
      return Object.assign({}, oldState, errors:[]);
    default:
      return merge(oldState, { errors: []});
  }
}

export default searchPerviewReducer;
