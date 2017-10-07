import { merge } from 'lodash';
import { REQUEST_PERVIEW_RESULTS, RECEIVE_PERVIEW_RESULTS, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/search_perview_actions';

const _nullSearchPerview = Object.freeze({
  isFetching: false,
  perviewResults: [
    {
      title: 'amazon',
      results: []
    },
    {
      title: 'perview',
      results: []
    }
  ],
  errors: []
})

const newArrayFromObject = (object) => {
  return Object.keys(object).map((key) => {
    if (object[key].length === 1) {
      // turns single perview into array for uniform format
      return [object[key][0]];
    } else {
      return object[key].map((perviewObject) => {
        return perviewObject;
      })
    }
  });
}

const searchPerviewReducer = (oldState = _nullSearchPerview, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case REQUEST_PERVIEW_RESULTS:
      return Object.assign({}, oldState, {
        isFetching: true
      });
    case RECEIVE_PERVIEW_RESULTS:
    // turns result object into an array
      let amazon = newArrayFromObject(action.results.amazon)
      let perview = newArrayFromObject(action.results.perview)

      let newState =  Object.assign({}, oldState, {
        perviewResults: [
          {
            title: 'perview',
            results: perview
          },
          {
            title: 'amazon',
            results: amazon
          },
        ],
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
