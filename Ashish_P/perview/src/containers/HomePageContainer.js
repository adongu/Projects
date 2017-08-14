import { connect } from 'react-redux';
import HomePage from "../render_components/Homepage/HomePage";
import { fetchUser } from '../actions/session_actions';
import { fetchResults } from '../actions/search_item_actions';
import { createPerview, createItem, fetchAllPerviews, fetchCategoryIds, clearErrors } from '../actions/perview_actions';
import { likePerview, bookmarkPerview } from '../actions/social_actions';

const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  return {
    isFetching: session.isFetching,
    currentUser: session.currentUser,
    selectedItem: perview.selectedItem,
    requestLoading: perview.requestLoading,
    allPerviews: perview.allPerviews,
    categoryIds: perview.categoryIds,
    results: findItem.itemResults
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchResults: (keywords) => dispatch(fetchResults(keywords)),
    createItem: (itemJSON) => dispatch(createItem(itemJSON)),
    createPerview: (formData) => dispatch(createPerview(formData)),
    fetchAllPerviews: (categoryId) => dispatch(fetchAllPerviews(categoryId)),
    fetchCategoryIds: (categoryId) => dispatch(fetchCategoryIds(categoryId)),
    likePerview: (perviewId) => dispatch(likePerview(perviewId)),
    bookmarkPerview: (perviewId) => dispatch(bookmarkPerview(perviewId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
