import { connect } from 'react-redux';
import FriendPerviews from "../render_components/FriendPerviews/FriendPerviews";
import { fetchUser } from '../actions/session_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { fetchCategoryIds, createPerview, fetchFriendPerviews, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  return {
    currentUser: session.currentUser,
    categories: session.currentUser,
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    perviews: perview.friendPerviews.perviews,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchFriendPerviews: (friendUserId, categoryId) => dispatch(fetchFriendPerviews(friendUserId, categoryId)),
    fetchCategoryIds: () => dispatch(fetchCategoryIds()),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendPerviews);
