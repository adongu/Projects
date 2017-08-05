import { connect } from 'react-redux';
import { login } from '../actions/session_actions';
// import {login, logout, signup, clearErrors } from '../actions/session_actions';
import SignIn from '../render_components/SignIn/SignIn';

const mapStateToProps = (props) => {
  console.log('Signin Container', props);
  return {
    loggedIn: Boolean(props.session.currentUser),
    errors: props.session.errors
  }
};

const mapDispatchToProps = ( dispatch, newProps) => {
  return ({
    login: (user) => dispatch(login(user)),
    // clearErrors: () => dispatch(clearErrors())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
