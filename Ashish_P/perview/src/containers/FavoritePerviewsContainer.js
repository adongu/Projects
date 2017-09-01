import { connect } from 'react-redux';
import FavoritePerviews from '../render_components/FavoritePerviews/FavoritePerviews';
import { fetchUser } from '../actions/session_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { createPerview, fetchFavoritePerviews, fetchCategoryIds, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    results: findItem.itemResults,
    perviews: perview.favoritePerviews.perviews,
    allCategoryIds: perview.categoryIds,
    categoryIds: perview.myPerviews.categories.map((obj)=> {obj.id})
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    createPerview: (formData) => dispatch(createPerview(formData)),
    fetchResults: (keywords) => dispatch(fetchItemResults(keywords)),
    fetchFavoritePerviews: (categoryId) => dispatch(fetchFavoritePerviews(categoryId)),
    fetchCategoryIds: (categoryId) => dispatch(fetchCategoryIds(categoryId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritePerviews);
