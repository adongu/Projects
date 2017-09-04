import { connect } from 'react-redux';
import ItemPerviews from '../render_components/ItemPerviews/ItemPerviews';
import { fetchUser } from '../actions/session_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { fetchCategoryIds, createItem, createPerview, fetchItemPerviews, clearErrors } from '../actions/perview_actions';
import { likePerview, bookmarkPerview } from '../actions/social_actions';


const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    results: findItem.itemResults,
    item: perview.itemPerviews.item,
    perviews: perview.itemPerviews.perviews,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchItemResults: (keywords) => dispatch(fetchItemResults(keywords)),
    fetchItemPerviews: (categoryId) => dispatch(fetchItemPerviews(categoryId)),
    fetchCategoryIds: () => dispatch(fetchCategoryIds()),
    likePerview: (perviewId) => dispatch(likePerview(perviewId)),
    bookmarkPerview: (perviewId) => dispatch(bookmarkPerview(perviewId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPerviews);
