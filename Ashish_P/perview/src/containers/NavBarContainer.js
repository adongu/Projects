import { connect } from 'react-redux';
import NavBar from "../render_components/NavBar/NavBar";
import { fetchUser } from '../actions/session_actions';
import { fetchResults } from '../actions/search_item_actions';
import { createPerview, fetchCategoryIds, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }) => {
  return {
    isFetching: session.isFetching,
    currentUser: session.currentUser,
    requestLoading: perview.requestLoading,
    allCategoryIds: perview.categoryIds,
    results: findItem.itemResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    createPerview: (formData) => dispatch(createPerview(formData)),
    fetchCategoryIds: (categoryId) => dispatch(fetchCategoryIds(categoryId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
