import { connect } from 'react-redux';
import FriendPerviews from "../render_components/FriendPerviews/FriendPerviews";
import { fetchUser } from '../actions/session_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { createPerview, fetchFriendPerviews, fetchCategoryIds, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  console.log('container', perview.friendPerviews);
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    results: findItem.itemResults,
    perviews: perview.friendPerviews.perviews,
    allCategoryIds: perview.categoryIds,
    categoryIds: perview.myPerviews.categories.map((obj)=> {obj.id})
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    createPerview: (formData) => dispatch(createPerview(formData)),
    fetchItemResults: (keywords) => dispatch(fetchItemResults(keywords)),
    fetchFriendPerviews: (friendUserId, categoryId) => dispatch(fetchFriendPerviews(friendUserId, categoryId)),
    fetchCategoryIds: (categoryId) => dispatch(fetchCategoryIds(categoryId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendPerviews);
