import React from 'react';
import { withRouter } from 'react-router-dom';

class SignIn extends React.Component {
  render() {
    return (
      <div className="signin__container">
        <div className="signin__logo">
          <img className="signin__logoimg" src="https://pmcdeadline2.files.wordpress.com/2016/07/logo-tv-logo.png"/>
        </div>
        <div className="signin__body">
          <div className="signin__body-welcome">
            Welcome to Perview
          </div>
          <div className="signin__body-message">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
          <form className="oauth__signin_form">
            <button onClick={null} className="oauth__signin--facebook">SIGN IN WITH FACEBOOK</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn);
