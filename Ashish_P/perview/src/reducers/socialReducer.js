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

const sessionReducer = (oldState = _nullSocial, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case FETCHING_UPDATE:
      return Object.assign({}, oldState, {
        fetchingUpdate: true,
        errors: []
      });
    case CREATE_COMMENT:
      let commentedPerview = Object.keys(allPerviews).filter((perview) => {
        perview.id === action.perviewId;
      })

      commentedPerview.comments.push(action.perview);

      let newAllPerviews = Object.keys(allperviews).map((perview) => {
        return perview.id === action.perviewId ? commentedPerview : perview;
      })

      return Object.assign({}, oldState, {
        allPerviews: newAllPerviews
        errors: []
      });
    case DELETE_COMMENT:
      let allPerviewsWithDeletedComment = Object.keys(allPerviews).map((perview) => {
        if(perview.id === action.perviewId) {
          return deletedCommentPerview(perview, action.comment.id);
        } else {
          return perview;
        }
      });

      return Object.assign({}, oldState, {
        allPerviews: allPerviewsWithDeletedComment
        errors: []
      });
    case FINISH_UPDATE:
      return Object.assign({}, oldState, {
        fetchingUpdate: false,
        errors: []
      });
    case RECEIVE_ERRORS:
      let errors = action.errors;
      return Object.assign({}, oldState, {
        errors: errors
      })
    default:
      return merge(oldState, { errors: []})
  };

};

const deletedCommentPerview = (perview, commentId) => {
  return perview[comments].filter((comment) => {
    return comment.id !== commentId;
  })
}



export default sessionReducer;
