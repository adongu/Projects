import { connect } from 'react-redux';
import SignInModalWrapper from "../render_components/SignIn/SignInModalWrapper";
import { showLoginModal, hideLoginModal } from '../actions/session_actions';

const mapStateToProps = ({ session }, ownProps) => {
  return {
    showLoginModal: session.showLoginModal,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoginModal: () => dispatch(showLoginModal()),
    hideLoginModal: () => dispatch(hideLoginModal()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInModalWrapper);
