import { connect } from 'react-redux';
import HomePage from "../render_components/Homepage/HomePage";
import { fetchUser } from '../actions/session_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { fetchCategoryIds, fetchAllPerviews, clearErrors } from '../actions/perview_actions';
import { createComment, deleteComment, likePerview, unlikePerview, bookmarkPerview, unbookmarkPerview } from '../actions/social_actions';

const mapStateToProps = ({ session, perview, findItem, social }, ownProps) => {
  return {
    isFetching: session.isFetching,
    currentUser: session.currentUser,
    requestLoading: perview.requestLoading,
    allPerviews: perview.allPerviews.perviews,
    results: findItem.itemResults,
    fetchingUpdate: social.fetchingUpdate
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchResults: (keywords) => dispatch(fetchItemResults(keywords)),
    fetchAllPerviews: (categoryId) => dispatch(fetchAllPerviews(categoryId)),
    createComment: (perviewId, comment) => dispatch(createComment(perviewId, comment)),
    deleteComment: (perviewId, commentId) => dispatch(deleteComment(perviewId, commentId)),
    bookmarkPerview: (perviewId) => dispatch(bookmarkPerview(perviewId)),
    unbookmarkPerview: (perviewId) => dispatch(unbookmarkPerview(perviewId)),
    likePerview: (perviewId) => dispatch(likePerview(perviewId)),
    unlikePerview: (perviewId) => dispatch(unlikePerview(perviewId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
