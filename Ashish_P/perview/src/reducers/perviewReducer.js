import { merge } from 'lodash';
import { REQUEST_LOADING, RECEIVE_ALL_PERVIEWS, RECEIVE_MY_PERVIEWS, RECEIVE_FAVORITE_PERVIEWS, RECEIVE_FRIEND_PERVIEWS, EDIT_PERVIEW, DELETE_PERVIEW, RECEIVE_ERRORS } from '../actions/perview_actions';

const _nullResults = Object.freeze({
  requestLoading: false,
  allPerviews: [],
  myPerviews: [],
  favoritePerviews: [],
  friendPerviews: [],
  errors: []
})

const perviewReducer = (oldState = _nullResults, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState)

  switch (action.type) {
    case REQUEST_LOADING:
      return Object.assign({}, oldState, {
        requestLoading: true
      });
    case RECEIVE_ALL_PERVIEWS:
      return Object.assign({}, newState, { allPerviews: action.allPerviews, errors: [] });
    case RECEIVE_MY_PERVIEWS:
      newState.allPerviews.unshift(action.myPerview);
      newState.myPerviews.unshift(action.myPerview);
      return Object.assign({}, newState, { errors: []});
    return Object.assign({}, newState, { favoritePerviews: action.favoritePerviews, errors: [] });
    case RECEIVE_FAVORITE_PERVIEWS:
      return Object.assign({}, newState, { favoritePerviews: action.favoritePerviews, errors: [] });
    case RECEIVE_FRIEND_PERVIEWS:
      newState.Perviews.unshift(action.perview);
      return Object.assign({}, newState, { friendPerviews: action.friendPerviews, errors: [] });
    case RECEIVE_ERRORS:
      let errors = action.errors;
      return Object.assign({}, oldState, {
        errors: errors
      });
    default:
      return merge(oldState, { errors: []});
  }
}

export default perviewReducer;
