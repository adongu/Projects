import { connect } from 'react-redux';
import { logIn, fetchUser, fetchToken } from '../actions/session_actions';
import SignIn from '../render_components/SignIn/SignIn';

const mapStateToProps = ({ session }) => {
  return {
    currentUser: session.currentUser,
    errors: session.errors
  }
};

const mapDispatchToProps = ( dispatch, newProps) => {
  return ({
    logIn: () => dispatch(logIn()),
    fetchUser: () => dispatch(fetchUser()),
    fetchToken: () => dispatch(fetchToken())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
