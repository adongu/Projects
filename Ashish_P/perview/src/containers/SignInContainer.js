import { connect } from 'react-redux';
import { logIn, fetchUser, fetchToken } from '../actions/session_actions';
// import {login, logout, signup, clearErrors } from '../actions/session_actions';
import SignIn from '../render_components/SignIn/SignIn';

const mapStateToProps = (props) => {
  return {
 // Boolean(props.session.currentUser),
    errors: props.session.errors
  }
};

const mapDispatchToProps = ( dispatch, newProps) => {
  return ({
    logIn: () => dispatch(logIn()),
    fetchUser: () => dispatch(fetchUser()),
    fetchToken: () => dispatch(fetchToken())
    // clearErrors: () => dispatch(clearErrors())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
