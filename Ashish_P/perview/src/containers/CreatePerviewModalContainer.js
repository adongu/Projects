import { connect } from 'react-redux';
import CreatePerviewModal from '../render_components/Header/CreatePerviews/CreatePerviewModal'
import { fetchUser, showLoginModal, ogOut } from '../actions/session_actions';
import { fetchPerviewResults } from '../actions/search_perview_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { createPerview, createItem, clearErrors } from '../actions/perview_actions';


const mapStateToProps = ({ session, perview, findItem }) => {
  return {
    currentUser: session.currentUser,
    itemResults: findItem.itemResults,
    selectedItem: perview.selectedItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchResults: (keywords) => dispatch(fetchItemResults(keywords)),
    createItem: (formData) => dispatch(createItem(formData)),
    createPerview: (formData) => dispatch(createPerview(formData)),
    showLoginModal: () => dispatch(showLoginModal()),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(CreatePerviewModal);
