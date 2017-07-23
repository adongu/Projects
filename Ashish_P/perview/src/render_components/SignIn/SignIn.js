import '../../styles/stylesheets/SignIn.css';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state =  {

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);
  }

  ComponentDidMount () {
    return (
      function(d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk')
  );
  }

  componentDidUpdate(newProps) {
    () => this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.goBack();
    } else {
      this.props.login();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.login();

    // console.log(this.props);
    // const user = Object.assign({},)
    this.redirectIfLoggedIn();
  }

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
              <button onClick={this.handleSubmit} className="signin__form-facebook">SIGN IN WITH FACEBOOK</button>
            </form>
          </div>
          <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>
        </div>
        <div className="signin__terms">
          <div id="fb-root">
          <button id="fb-root">Login</button>
          </div>
          Creating an account means you're OK with Perview's <Link className="signin__terms-urls" to="">Terms of Service</Link> and <Link className="signin__terms-urls" to="">Privacy Policy</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn);
