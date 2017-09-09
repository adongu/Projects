import { connect } from 'react-redux';
import ItemPerviews from '../render_components/ItemPerviews/ItemPerviews';
import { fetchUser } from '../actions/session_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { fetchCategoryIds, fetchItemPerviews, clearErrors } from '../actions/perview_actions';
import { likePerview, unlikePerview, bookmarkPerview, unbookmarkPerview } from '../actions/social_actions';


const mapStateToProps = ({ session, perview, findItem, social }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    results: findItem.itemResults,
    item: perview.itemPerviews.item,
    perviews: perview.itemPerviews.perviews,
    fetchingUpdate: social.fetchingUpdate
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchItemResults: (keywords) => dispatch(fetchItemResults(keywords)),
    fetchItemPerviews: (categoryId) => dispatch(fetchItemPerviews(categoryId)),
    fetchCategoryIds: () => dispatch(fetchCategoryIds()),
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
)(ItemPerviews);
