import '../../styles/stylesheets/signin.css';
import '../../styles/assets/background.png';

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);
  }

  componentWillMount() {
    this.props.fetchToken();
    this.props.fetchUser()
    // .then(() => {
    //   this.redirectIfLoggedIn(this.props);
    // })
  }

  componentDidMount () {
  }


  redirectIfLoggedIn (props) {
    if (props.currentUser) {
      props.history.push({ pathname: '/' });
    }
  }

  getCsrfToken () {
    var name = 'XSRF-TOKEN=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  handleSubmit (e) {

  }

  render() {
    const auth_url = "http://localhost:8080/connect/facebook";
    let token = this.getCsrfToken();

    return (
      <div className="signin">
        <div className="signin__container">
          <div className="flexcolumn signin__box">
            <div className="signin__logo">
              <img className="signin__logoimg" src="https://s3.amazonaws.com/yumpapp-dev/perview/logo.jpg" alt="logo"/>
            </div>
            <div className="flexcolumn signin__body">
              <div className="signin__bodywelcome">
                Welcome to Perview
              </div>
              <div className="signin__bodymessage">
                A place to tell your friends about your favorite things.
              </div>
              <form className="flexcolumn signin__form" action={auth_url} method="post">
                <input type="hidden" name="scope" value="user_friends,email"/>
                <input type="hidden" name="_csrf" value={token}/>
                <button type="submit" className="signin__submit-facebook">Continue with Facebook</button>
                <p className="signin__submit-msg">
                  We don’t post anything to Facebook.
                </p>
              </form>
            </div>
            <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>
          </div>
          <div className="signin__terms">
            By continuing, you indicate that you have read and agree Perview's
            <a href="https://s3.amazonaws.com/tosandpp/2017_9_7_Perview_Terms_of_Service.pdf" className="signin__terms-urls" target="_blank">Terms of Service</a>
            and
            <a href="https://s3.amazonaws.com/tosandpp/2017_9_7_Perview_Privacy_Policy.pdf" className="signin__terms-urls" target="_blank">Privacy Policy</a>
          </div>
        </div>
        <div className="signin__background">
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);

// <form className="signin__form" onSubmit={this.handleSubmit}>
// <form className="signin__form" action={auth_url} method="post">


// <button onClick={this.handleSubmit} className="signin__form-facebook">SIGN IN WITH FACEBOOK</button>
