import { merge } from 'lodash';
import { REQUEST_LOADING, RECEIVE_ITEM, RECEIVE_PERVIEW, RECEIVE_ALL_PERVIEWS, RECEIVE_ITEM_PERVIEWS, RECEIVE_MY_PERVIEWS, RECEIVE_FAVORITE_PERVIEWS, RECEIVE_FRIEND_PERVIEWS, RECEIVE_CATEGORY_IDS, RECEIVE_NUM_PERVIEWS, RECEIVE_ERRORS } from '../actions/perview_actions';

const _nullPerviews = Object.freeze({
  requestLoading: false,
  selectedItem: {},
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
  friendPerviews: {
    categories: [],
    perviews: []
  },
  numPerviews: null,
  errors: []
})

const perviewReducer = (oldState = _nullPerviews, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState)

  switch (action.type) {
    case REQUEST_LOADING:
      return Object.assign({}, oldState, {
        requestLoading: true
      });
      case RECEIVE_PERVIEW:
      newState.allPerviews.unshift(action.perview);
      if (action.perview.id === newState.itemPerviews.item.id) {
        newState.itemPerviews.perviews.unshift(action.perview);
      }
      return Object.assign({}, newState, {
        requestLoading: false,
        errors: []
      });
    case RECEIVE_ALL_PERVIEWS:
      return Object.assign({}, newState, {
        allPerviews: action.allPerviews.reverse(),
        requestLoading: false,
        errors: []
      });
    case RECEIVE_ITEM:
      return Object.assign({}, newState, {
        selectedItem: action.item,
        requestLoading: false,
        errors: []
      });
    case RECEIVE_ITEM_PERVIEWS:
      console.log('item reducer', action.itemPerviews);
      return Object.assign({}, newState, {
        itemPerviews: action.itemPerviews,
        requestLoading: false,
        errors: []
      });
    case RECEIVE_MY_PERVIEWS:
      // newState.myPerviews.categories.unshift(action.myPerviews.categories);
      return Object.assign({}, newState, {
        myPerviews: action.myPerviews,
        requestLoading: false,
        errors: []
      });
    case RECEIVE_FAVORITE_PERVIEWS:
      console.log('favorite perviews', action.favoritePerviews);
      return Object.assign({}, newState, {
        favoritePerviews: action.favoritePerviews,
        requestLoading: false,
        errors: []
      });
    case RECEIVE_FRIEND_PERVIEWS:
      // newState.Perviews.unshift(action.perview);
      console.log('friendperviews', action.friendPerviews);
      return Object.assign({}, newState, {
        friendPerviews: action.friendPerviews,
        requestLoading: false,
        errors: []
      });
    case RECEIVE_NUM_PERVIEWS:
    console.log(action.numPerviews);
      return Object.assign({}, newState, {
        numPerviews: action.numPerviews,
        requestLoading: false,
        errors: []
      });
    case RECEIVE_CATEGORY_IDS:
      console.log('perview reducer', action.categoryIds);
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
