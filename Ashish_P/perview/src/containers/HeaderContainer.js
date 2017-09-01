import { connect } from 'react-redux';
import Header from '../render_components/Header/Header'
import { fetchUser, logOut } from '../actions/session_actions';
import { fetchPerviewResults } from '../actions/search_perview_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { createPerview, createItem, clearErrors } from '../actions/perview_actions';


const mapStateToProps = ({ session, perview, findPerview, findItem }) => {
  return {
    isFetching: session.isFetching,
    currentUser: session.currentUser,
    requestLoading: perview.requestLoading,
    selectedItem: perview.selectedItem,
    perviewResults: findPerview.perviewResults,
    itemResults: findItem.perviewResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchPerviewResults: (keywords) => dispatch(fetchPerviewResults(keywords)),
    fetchItemResults: (keywords) => dispatch(fetchItemResults(keywords)),
    createPerview: (formData) => dispatch(createPerview(formData)),
    createItem: (formData) => dispatch(createItem(formData)),
    logOut: () => dispatch(logOut()),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Header);
