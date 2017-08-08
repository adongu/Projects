import { connect } from 'react-redux';
import CreatePerviewModal from '../render_components/CreatePerviews/CreatePerviewModal'
import { fetchuser, logout } from '../actions/session_actions';

const mapStateToProps = ({session}) => {
  return {
    currentUser: session.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(CreatePerviewModal);
