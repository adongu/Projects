import '../../styles/stylesheets/SignIn.css';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SignIn extends React.Component {
  render() {
    return (
      <div className="signin__container">
        <div className="column signin__box">
          <div className="signin__logo">
            <img className="signin__logoimg" src="https://pmcdeadline2.files.wordpress.com/2016/07/logo-tv-logo.png"/>
          </div>
          <div className="column signin__body">
            <div className="signin__bodywelcome">
              Welcome to Perview
            </div>
            <div className="signin__bodymessage">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exe ea commodo consequat.
            </div>
            <form className="signin__form">
              <button onClick={null} className="signin__form-facebook">SIGN IN WITH FACEBOOK</button>
            </form>
          </div>
        </div>
        <div className="signin__terms">
          Creating an account means you're OK with Perview's <Link className="signin__terms-urls" to="">Terms of Service</Link> and <Link className="signin__terms-urls" to="">Privacy Policy</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn);
