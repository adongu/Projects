import { connect } from 'react-redux';
import {login, logout, signup, clearErrors } from '../actions/session_actions';
import SignIn from '../render_components/SignIn/SignIn';

const mapStateToProps = ({ session }) => {
  return {
    loggedIn: Boolean(session.currentUser),
    errors: session.errors
  }
};

const mapDispatchToProps = ( dispatch, newProps) => {
  return ({
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
