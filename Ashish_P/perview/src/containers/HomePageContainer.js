import { connect } from 'react-redux';
import HomePage from "../render_components/Homepage/HomePage";
import { fetchUser } from '../actions/session_actions';
import { fetchResults } from '../actions/search_item_actions';
import { createPerview, fetchAllPerviews, fetchCategoryIds, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    results: findItem.itemResults,
    allPerviews: perview.allPerviews,
    categoryIds: perview.categoryIds
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    createPerview: (formData) => dispatch(createPerview(formData)),
    fetchResults: (keywords) => dispatch(fetchResults(keywords)),
    fetchAllPerviews: (categoryId) => dispatch(fetchAllPerviews(categoryId)),
    fetchCategoryIds: (categoryId) => dispatch(fetchCategoryIds(categoryId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
