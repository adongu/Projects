import { merge } from 'lodash';
import { REQUEST_LOADING, RECEIVE_ITEM, RECEIVE_PERVIEW, EDIT_PERVIEW, DELETE_PERVIEW, RECEIVE_ALL_PERVIEWS, RECEIVE_ITEM_PERVIEWS, RECEIVE_MY_PERVIEWS, RECEIVE_FAVORITE_PERVIEWS, RECEIVE_FRIEND_PERVIEWS, RECEIVE_CATEGORY_IDS, RECEIVE_NUM_PERVIEWS, RECEIVE_ERRORS } from '../actions/perview_actions';

const _nullPerviews = Object.freeze({
  requestLoading: false,
  selectedItem: {},
  categoryIds: [],
  allPerviews: {
    categories: [],
    perviews: []
  },
  itemPerviews: {
    item: {},
    categories: [],
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
    user: {},
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
      newState.allPerviews.perviews.unshift(action.perview);
      newState.myPerviews.perviews.unshift(action.perview);
      if (action.perview.id === newState.itemPerviews.item.id) {
        newState.itemPerviews.perviews.unshift(action.perview);
      }
      return Object.assign({}, newState, {
        requestLoading: false,
        errors: []
      });
    // case RECEIVE_EDIT_PERVIEW:


    // for (var pair of formData.entries()) {
    // console.log(pair[0]+ ', ' + pair[1]);
    // }
      // return Object.assign({}, newState, {
      //   myPerviews: {
      //
      //   }
      // })
    case DELETE_PERVIEW:
      const newPerviews = newState.myPerviews.perviews.filter((perview) => {
        return perview.id !== action.perviewId
      });

      return Object.assign({}, newState, {
        myPerviews: {
          perviews: newPerviews
        },
        requestLoading: false,
        errors: []
      });

    case RECEIVE_ALL_PERVIEWS:
      return Object.assign({}, newState, {
        allPerviews: {
          perviews: action.allPerviews.perviews,
          categories: action.allPerviews.categories
        } ,
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
      return Object.assign({}, newState, {
        itemPerviews: action.itemPerviews,
        requestLoading: false,
        errors: []
      });

    case RECEIVE_MY_PERVIEWS:
      return Object.assign({}, newState, {
        myPerviews: {
          perviews: action.myPerviews.perviews,
          categories: action.myPerviews.categories
        },
        requestLoading: false,
        errors: []
      });

    case RECEIVE_FAVORITE_PERVIEWS:
      return Object.assign({}, newState, {
        favoritePerviews: {
          perviews: action.favoritePerviews.perviews,
          categories: action.favoritePerviews.categories
        },
        requestLoading: false,
        errors: []
      });

    case RECEIVE_FRIEND_PERVIEWS:
      // newState.Perviews.unshift(action.perview);

      console.log(action.friendPerviews.categories);

      return Object.assign({}, newState, {
        friendPerviews: {
          user: action.friendPerviews.user,
          perviews: action.friendPerviews.perviews,
          categories: action.friendPerviews.categories
        },
        requestLoading: false,
        errors: []
      });

    case RECEIVE_NUM_PERVIEWS:
      return Object.assign({}, newState, {
        numPerviews: action.numPerviews,
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
        requestLoading: false,
        errors: errors
      });

    default:
      return merge(oldState, {
        requestLoading: false,
        errors: []
      });
  }
}

export default perviewReducer;
