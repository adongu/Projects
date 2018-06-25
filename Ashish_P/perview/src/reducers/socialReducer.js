import { merge } from 'lodash';
import { FETCHING_UPDATE, CREATE_COMMENT, DELETE_COMMENT, FINISH_UPDATE, RECEIVE_ERRORS } from '../actions/social_actions';

const _nullSocial = Object.freeze({
  fetchingUpdate: false,
  UserSocialState: {
    likes: {},
    bookmarks: {},
    allPerviews: {
      perviews: []
    },
  },
  errors: []
})

const deletedCommentPerview = (perview, commentId, newState) => {
  return perview[newState.comments].filter((comment) => {
    return comment.id !== commentId;
  })
}

const sessionReducer = (oldState = _nullSocial, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState)

  switch (action.type) {
    case FETCHING_UPDATE:
      return Object.assign({}, oldState, {
        fetchingUpdate: true,
        errors: []
      });
    // case CREATE_COMMENT:
    //   let commentedPerview = Object.keys(newState.allPerviews).filter((perview) => (
    //     perview.id === action.perviewId
    //   ))
    //   commentedPerview.comments.push(action.perview);
    //
    //   let newAllPerviews = Object.keys(newState.allPerviews).map((perview) => {
    //     return perview.id === action.perviewId ? commentedPerview : perview;
    //   })
    //
    //   return Object.assign({}, newState, {
    //     fetchingUpdate: false,
    //     allPerviews: newAllPerviews,
    //     errors: []
    //   });
    // case DELETE_COMMENT:
    //   let allPerviewsWithDeletedComment = Object.keys(newState.allPerviews).map((perview) => {
    //     if(perview.id === action.perviewId) {
    //       return deletedCommentPerview(perview, action.comment.id, newState);
    //     } else {
    //       return perview;
    //     }
    //   });
    //
    //   return Object.assign({}, newState, {
    //     fetchingUpdate: false,
    //     allPerviews: allPerviewsWithDeletedComment,
    //     errors: []
    //   });
    case FINISH_UPDATE:
      return Object.assign({}, oldState, {
        fetchingUpdate: false,
        errors: []
      });
    case RECEIVE_ERRORS:
      let errors = action.errors;
      return Object.assign({}, oldState, {
        errors: errors
      });
    default:
      return merge(oldState, { errors: []});
  }
};




export default sessionReducer;
