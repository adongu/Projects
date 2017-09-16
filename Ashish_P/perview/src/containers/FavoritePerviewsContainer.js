import { connect } from 'react-redux';
import FavoritePerviews from '../render_components/FavoritePerviews/FavoritePerviews';
import { fetchUser } from '../actions/session_actions';
import { fetchFavoritePerviews, clearErrors } from '../actions/perview_actions';
import { likePerview, unlikePerview, bookmarkPerview, unbookmarkPerview } from '../actions/social_actions';

const mapStateToProps = ({ session, perview, findItem, social }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    categories: perview.favoritePerviews.categories,
    perviews: perview.favoritePerviews.perviews,
    requestLoading: perview.requestLoading,
    fetchingUpdate: social.fetchingUpdate
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchFavoritePerviews: (categoryId) => dispatch(fetchFavoritePerviews(categoryId)),
    bookmarkPerview: (perviewId) => dispatch(bookmarkPerview(perviewId)),
    unbookmarkPerview: (perviewId) => dispatch(unbookmarkPerview(perviewId)),
    likePerview: (perviewId) => dispatch(likePerview(perviewId)),
    unlikePerview: (perviewId) => dispatch(unlikePerview(perviewId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritePerviews);
