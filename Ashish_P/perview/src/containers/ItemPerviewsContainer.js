import { connect } from 'react-redux';
import ItemPerviews from '../render_components/ItemPerviews/ItemPerviews';
import { fetchUser } from '../actions/session_actions';
import { fetchResults } from '../actions/search_item_actions';
import { createItem, createPerview, fetchItemPerviews, fetchCategoryIds, clearErrors } from '../actions/perview_actions';
import { likePerview, bookmarkPerview } from '../actions/social_actions';


const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    results: findItem.itemResults,
    item: perview.itemPerviews.item,
    perviews: perview.itemPerviews.perviews,
    allCategoryIds: perview.categoryIds,
    categoryIds: perview.myPerviews.categories.map((obj)=> {obj.id}),
    selectedItem: perview.selectedItem
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    createItem: (itemJSON) => dispatch(createItem(itemJSON)),
    createPerview: (formData) => dispatch(createPerview(formData)),
    fetchResults: (keywords) => dispatch(fetchResults(keywords)),
    fetchItemPerviews: (categoryId) => dispatch(fetchItemPerviews(categoryId)),
    fetchCategoryIds: (categoryId) => dispatch(fetchCategoryIds(categoryId)),
    likePerview: (perviewId) => dispatch(likePerview(perviewId)),
    bookmarkPerview: (perviewId) => dispatch(bookmarkPerview(perviewId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPerviews);
