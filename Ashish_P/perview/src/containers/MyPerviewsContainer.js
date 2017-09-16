import { connect } from 'react-redux';
import MyPerviews from "../render_components/MyPerviews/MyPerviews";
import { fetchUser } from '../actions/session_actions';
import { fetchMyPerviews, editPerview, deletePerview, clearErrors } from '../actions/perview_actions';
import { likePerview, unlikePerview, bookmarkPerview, unbookmarkPerview } from '../actions/social_actions';

const mapStateToProps = ({ session, perview, findItem, social }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    categories: perview.myPerviews.categories,
    perviews: perview.myPerviews.perviews,
    requestLoading: perview.requestLoading,
    fetchingUpdate: social.fetchingUpdate
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editPerview: (perview) => dispatch(editPerview(perview)),
    deletePerview: (perviewId) => dispatch(deletePerview(perviewId)),
    fetchUser: () => dispatch(fetchUser()),
    fetchMyPerviews: (categoryId) => dispatch(fetchMyPerviews(categoryId)),
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
)(MyPerviews);
