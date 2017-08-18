import { connect } from 'react-redux';
import MyPerviews from "../render_components/MyPerviews/MyPerviews";
import { fetchUser } from '../actions/session_actions';
import { fetchResults } from '../actions/search_item_actions';
import { createPerview, fetchFriendPerviews, fetchCategoryIds, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    results: findItem.itemResults,
    perviews: perview.FriendPerviews.perviews,
    allCategoryIds: perview.categoryIds,
    categoryIds: perview.myPerviews.categories.map((obj)=> {obj.id})
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    createPerview: (formData) => dispatch(createPerview(formData)),
    fetchResults: (keywords) => dispatch(fetchResults(keywords)),
    fetchFriendPerviews: (friendUserId, categoryId) => dispatch(fetchFriendPerviews(friendUserId, categoryId)),
    fetchCategoryIds: (categoryId) => dispatch(fetchCategoryIds(categoryId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPerviews);
