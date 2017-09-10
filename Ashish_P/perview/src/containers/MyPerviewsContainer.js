import { connect } from 'react-redux';
import MyPerviews from "../render_components/MyPerviews/MyPerviews";
import { fetchUser } from '../actions/session_actions';
import { fetchMyPerviews, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching,
    categories: perview.myPerviews.categories,
    perviews: perview.myPerviews.perviews,
    requestLoading: perview.requestLoading
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchMyPerviews: (categoryId) => dispatch(fetchMyPerviews(categoryId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPerviews);
