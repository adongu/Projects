import { merge } from 'lodash';
import { REQUEST_LOADING, RECEIVE_ITEM, RECEIVE_PERVIEW, RECEIVE_EDIT_PERVIEW, DELETE_PERVIEW, RECEIVE_LANDING_PERVIEWS, RECEIVE_ALL_PERVIEWS, RECEIVE_ITEM_PERVIEWS, RECEIVE_MY_PERVIEWS, RECEIVE_FAVORITE_PERVIEWS, RECEIVE_FRIEND_PERVIEWS, RECEIVE_SOLICIT_PERVIEWS, RECEIVE_CATEGORY_IDS, RECEIVE_NUM_PERVIEWS, RECEIVE_ERRORS } from '../actions/perview_actions';

const _nullPerviews = Object.freeze({
  requestLoading: false,
  selectedItem: {},
  categoryIds: [],
  landingPerviews: {
    categories: [],
    perviews: []
  },
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
  solicitPerviews: {
    solicit: {},
    categories: [],
    perviews: []
  },
  numPerviews: null,
  errors: []
})

const perviewReducer = (oldState = _nullPerviews, action) => {
  Object.freeze(oldState);
  const newState = merge({}, oldState)

  switch (action.type) {
    case REQUEST_LOADING:
      return Object.assign({}, oldState, {
        requestLoading: true
      });
    case RECEIVE_PERVIEW:
      if (Array.isArray(action.perviewObj)) {
        action.perviewObj.forEach((perview) => {
          newState.allPerviews.perviews.unshift(perview);
          newState.myPerviews.perviews.unshift(perview);
        });
      } else {
        newState.allPerviews.perviews.unshift(action.perviewObj);
        newState.myPerviews.perviews.unshift(action.perviewObj);
      }

      return Object.assign({},
        newState,
        {
          requestLoading: false,
          errors: [],
        }
      );
    case RECEIVE_EDIT_PERVIEW:

      const newEditedMyPerviews = newState.myPerviews.perviews.map((perview) => {
        if(perview.id === action.perview.id) {
          return action.perview;
        } else {
          return perview;
        }
      });

      const newEditedAllPerviews = newState.newAllPerviews.perviews.map((perview) => {
        if(perview.id === action.perview.id) {
          return action.perview;
        } else {
          return perview;
        }
      });

      return Object.assign({}, newState, {
        myPerviews: {
          perviews: newEditedMyPerviews,
        },
        allPerviews: {
          perviews: newEditedAllPerviews,
        },
        requestLoading: false,
        errors: []
      });
    // For pattern, check out http://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html
    case DELETE_PERVIEW:
      let newAllPerviews = newState.allPerviews.perviews.filter((perview) => {
        return perview.id !== action.perviewId
      });

      let newMyPerviews = newState.myPerviews.perviews.filter((perview) => {
        return perview.id !== action.perviewId
      });

      return Object.assign({}, newState, {
        allPerviews: {
          perviews: newAllPerviews,
        },
        myPerviews: {
          perviews: newMyPerviews,
        },
        requestLoading: false,
        errors: []
      });

    case RECEIVE_LANDING_PERVIEWS:
      return Object.assign({}, newState, {
        landingPerviews: {
          perviews: action.landingPerviews.perviews,
          categories: action.landingPerviews.categories
        },
        requestLoading: false,
        errors: []
      });

    case RECEIVE_ALL_PERVIEWS:
      return Object.assign({}, newState, {
        allPerviews: {
          perviews: action.allPerviews.perviews,
          categories: action.allPerviews.categories
        },
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
      return Object.assign({}, newState, {
        friendPerviews: {
          user: action.friendPerviews.user,
          perviews: action.friendPerviews.perviews,
          categories: action.friendPerviews.categories
        },
        requestLoading: false,
        errors: []
      });

    case RECEIVE_SOLICIT_PERVIEWS:
      return Object.assign({}, newState, {
        solicitPerviews: {
          perviews: action.solicitPerviews.perviews,
          categories: action.solicitPerviews.categories
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
