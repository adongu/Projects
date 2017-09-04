import { connect } from 'react-redux';
import NavBar from "../render_components/NavBar/NavBar";
import { fetchUser } from '../actions/session_actions';
import { fetchResults } from '../actions/search_item_actions';
import { createPerview, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem, match }) => {
  return {
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    currentUser: session.currentUser,
    allCategoryIds: perview.categoryIds,
    match: match
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
