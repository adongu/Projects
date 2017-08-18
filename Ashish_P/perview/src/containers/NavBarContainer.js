import { connect } from 'react-redux';
import NavBar from "../render_components/NavBar/NavBar";
import { fetchUser } from '../actions/session_actions';
import { fetchResults } from '../actions/search_item_actions';
import { createPerview, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }) => {
  isFetching: session.isFetching,
  currentUser: session.currentUser,
  selectedItem: perview.selectedItem,
  requestLoading: perview.requestLoading,
  categoryIds: perview.categoryIds,
  results: findItem.itemResults
}

const mapDispatchToProps = (dispatch) => {
  fetchUser: () => dispatch(fetchUser()),
  fetchResults: (keywords) => dispatch(fetchResults(keywords)),
  createPerview: (formData) => dispatch(createPerview(formData)),
  clearErrors: () => dispatch(clearErrors())
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
