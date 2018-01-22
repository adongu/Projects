import { connect } from 'react-redux';
import CreatePerviewModal from '../render_components/Header/CreatePerviews/CreatePerviewModal'
import { fetchUser, showLoginModal } from '../actions/session_actions';
import { fetchItemResults } from '../actions/search_item_actions';
import { createPerview, createItem, clearErrors } from '../actions/perview_actions';


const mapStateToProps = ({ session, perview, findItem }) => {
  return {
    currentUser: session.currentUser,
    itemResults: findItem.itemResults,
    // metadataResults: findItem.metadataResults,
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
