import { merge } from 'lodash';
import { REQUEST_LOADING, RECEIVE_ALL_PERVIEWS, RECEIVE_ITEM_PERVIEWS, RECEIVE_MY_PERVIEWS, RECEIVE_FAVORITE_PERVIEWS, RECEIVE_FRIEND_PERVIEWS, RECEIVE_CATEGORY_IDS, EDIT_PERVIEW, DELETE_PERVIEW, RECEIVE_ERRORS } from '../actions/perview_actions';

const _nullResults = Object.freeze({
  requestLoading: false,
  categoryIds: [],
  allPerviews: [],
  itemPerviews: {
    item: {},
    perviews: []
  },
  myPerviews: {
    categories: [],
    perviews: []
  },
  favoritePerviews: {
    categories: [],
    perviews: []
  },
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
      return Object.assign({}, newState, {
        allPerviews: action.allPerviews.reverse(),
        requestLoading: false,
        errors: []
      });
    case RECEIVE_ITEM_PERVIEWS:
    console.log('reducer', action.itemPerviews);
      return Object.assign({}, newState, {
        itemPerviews: action.itemPerviews,
        requestLoading: false,
        errors: []
      });
    case RECEIVE_MY_PERVIEWS:
    // console.log('Reducer', action);
    //   newState.allPerviews.unshift(action.myPerviews);
    //   newState.myPerviews.perviews.unshift(action.myPerviews);
    //   newState.myPerviews.categories.unshift(action.myPerviews.categories);
      return Object.assign({}, newState, {
        myPerviews: action.myPerviews,
        requestLoading: false,
        errors: []
      });
    case RECEIVE_FAVORITE_PERVIEWS:
    console.log(action.favoritePerviews);
      return Object.assign({}, newState, {
        favoritePerviews: action.favoritePerviews,
        requestLoading: false,
        errors: []
      });
    case RECEIVE_FRIEND_PERVIEWS:
      newState.Perviews.unshift(action.perview);
      return Object.assign({}, newState, {
        friendPerviews: action.friendPerviews,
        requestLoading: false,
        errors: []
      });
    case RECEIVE_CATEGORY_IDS:
      return Object.assign({}, newState, {
        categoryIds: action.categoryIds,
        requestLoading: false,
        errors: []
      });
    case RECEIVE_ERRORS:
      let errors = action.errors;
      return Object.assign({}, oldState, {
        errors: errors
      });
    default:
      return merge(oldState, {
        errors: []
      });
  }
}

export default perviewReducer;
