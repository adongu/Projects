import { connect } from 'react-redux';
import FriendPerviews from "../render_components/FriendPerviews/FriendPerviews";
import { fetchUser } from '../actions/session_actions';
import { fetchCategoryIds, fetchFriendPerviews, clearErrors } from '../actions/perview_actions';
import { likePerview, unlikePerview, bookmarkPerview, unbookmarkPerview } from '../actions/social_actions';

const mapStateToProps = ({ session, perview, findItem, social}, ownProps) => {
  return {
    userFriend: perview.friendPerviews.user,
    currentUser: session.currentUser,
    perviews: perview.friendPerviews.perviews,
    categories: perview.friendPerviews.categories,
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    fetchingUpdate: social.fetchingUpdate
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchFriendPerviews: (friendUserId, categoryId) => dispatch(fetchFriendPerviews(friendUserId, categoryId)),
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
)(FriendPerviews);
