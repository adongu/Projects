import { connect } from 'react-redux';
import LandingPage from "../render_components/LandingPage/LandingPage";
import { fetchUser, fetchToken, showLoginModal, hideLoginModal } from '../actions/session_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { fetchLandingPerviews, clearErrors } from '../actions/perview_actions';
import { createComment, deleteComment, likePerview, unlikePerview, bookmarkPerview, unbookmarkPerview } from '../actions/social_actions';

const mapStateToProps = ({ session, perview, findItem, social }, ownProps) => {
  return {
    isFetching: session.isFetching,
    currentUser: session.currentUser,
    requestLoading: perview.requestLoading,
    landingPerviews: perview.landingPerviews.perviews,
    results: findItem.itemResults,
    fetchingUpdate: social.fetchingUpdate,
    isLoginModalOn: session.showLoginModal,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchToken: () => dispatch(fetchToken()),
    fetchResults: (keywords) => dispatch(fetchItemResults(keywords)),
    fetchLandingPerviews: (categoryId) => dispatch(fetchLandingPerviews(categoryId)),
    createComment: (perviewId, comment) => dispatch(createComment(perviewId, comment)),
    deleteComment: (perviewId, commentId) => dispatch(deleteComment(perviewId, commentId)),
    bookmarkPerview: (perviewId) => dispatch(bookmarkPerview(perviewId)),
    unbookmarkPerview: (perviewId) => dispatch(unbookmarkPerview(perviewId)),
    likePerview: (perviewId) => dispatch(likePerview(perviewId)),
    unlikePerview: (perviewId) => dispatch(unlikePerview(perviewId)),
    showLoginModal: () => dispatch(showLoginModal()),
    hideLoginModal: () => dispatch(hideLoginModal()),
    clearErrors: () => dispatch(clearErrors()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
