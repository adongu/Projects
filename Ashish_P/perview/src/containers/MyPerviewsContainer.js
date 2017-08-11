import { connect } from 'react-redux';
import MyPerviews from "../render_components/MyPerviews/MyPerviews";
import { fetchUser } from '../actions/session_actions';
import { fetchResults } from '../actions/search_item_actions';
import { createPerview, fetchMyPerviews, fetchCategoryIds, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  console.log('container', perview.myPerviews);
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    results: findItem.itemResults,
    perviews: perview.myPerviews.perviews,
    categoryIds: perview.myPerviews.categories.map((obj)=> {obj.id})
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    createPerview: (formData) => dispatch(createPerview(formData)),
    fetchResults: (keywords) => dispatch(fetchResults(keywords)),
    fetchMyPerviews: (categoryId) => dispatch(fetchMyPerviews(categoryId)),
    fetchCategoryIds: (categoryId) => dispatch(fetchCategoryIds(categoryId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPerviews);
