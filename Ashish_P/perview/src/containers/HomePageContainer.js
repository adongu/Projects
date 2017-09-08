import { connect } from 'react-redux';
import HomePage from "../render_components/Homepage/HomePage";
import { fetchUser } from '../actions/session_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { fetchCategoryIds, createPerview, createItem, fetchAllPerviews, clearErrors } from '../actions/perview_actions';
import { fetchingUpdate, likePerview, unlikePerview, bookmarkPerview, unbookmarkPerview } from '../actions/social_actions';

const mapStateToProps = ({ session, perview, findItem, social }, ownProps) => {
  console.log(perview.allPerviews.perviews);
  return {
    isFetching: session.isFetching,
    currentUser: session.currentUser,
    requestLoading: perview.requestLoading,
    allPerviews: perview.allPerviews.perviews,
    results: findItem.itemResults,
    fetchingUpdate: social.fetchingUpdate
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchResults: (keywords) => dispatch(fetchItemResults(keywords)),
    fetchAllPerviews: (categoryId) => dispatch(fetchAllPerviews(categoryId)),
    fetchCategoryIds: () => dispatch(fetchCategoryIds()),
    likePerview: (perviewId) => dispatch(likePerview(perviewId)),
    unlikePerview: (perviewId) => dispatch(unlikePerview(perviewId)),
    bookmarkPerview: (perviewId) => dispatch(bookmarkPerview(perviewId)),
    unbookmarkPerview: (perviewId) => dispatch(unbookmarkPerview(perviewId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
