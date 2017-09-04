import { connect } from 'react-redux';
import MyPerviews from "../render_components/MyPerviews/MyPerviews";
import { fetchUser } from '../actions/session_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { fetchCategoryIds, createPerview, fetchMyPerviews, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    results: findItem.itemResults,
    perviews: perview.myPerviews.perviews,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    createPerview: (formData) => dispatch(createPerview(formData)),
    fetchItemResults: (keywords) => dispatch(fetchItemResults(keywords)),
    fetchMyPerviews: (categoryId) => dispatch(fetchMyPerviews(categoryId)),
    fetchCategoryIds: () => dispatch(fetchCategoryIds()),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPerviews);
