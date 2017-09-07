import { connect } from 'react-redux';
import FavoritePerviews from '../render_components/FavoritePerviews/FavoritePerviews';
import { fetchUser } from '../actions/session_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { fetchCategoryIds, createPerview, fetchFavoritePerviews, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    categories: perview.favoritePerviews.categories,
    perviews: perview.favoritePerviews.perviews,
    requestLoading: perview.requestLoading
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchFavoritePerviews: (categoryId) => dispatch(fetchFavoritePerviews(categoryId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritePerviews);
