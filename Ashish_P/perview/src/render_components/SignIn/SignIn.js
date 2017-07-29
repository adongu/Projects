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

  }

  // componentDidUpdate(newProps) {
  //   () => this.redirectIfLoggedIn();
  // }

  redirectIfLoggedIn() {
    // if (this.props.loggedIn) {
    //   console.log("this.props.loggedIn", this.props);
    //   this.props.router.goBack();
    // } else {
      console.log("this.props.loggedIn", this.props);
      this.props.login()

    // }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(e.target.value);

    // console.log("handlesubmit", this.props);
    // const user = Object.assign({},)
    // this.redirectIfLoggedIn();
    // <Link to="/" />
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
              Purchase your favorite products with the trust of your friends
            </div>
            <form className="signin__form" onSubmit={this.handleSubmit}>
              <input type="hidden" name="scope" value="user_friends" />
              <a href="http://localhost:8080/connect/facebook">Connect to facebook</a>
              <button className="signin__form-facebook">SIGN IN WITH FACEBOOK</button>
            </form>
          </div>
          <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>
        </div>
        <div className="signin__terms">
          Creating an account means you're OK with Perview's <Link className="signin__terms-urls" to="">Terms of Service</Link> and <Link className="signin__terms-urls" to="">Privacy Policy</Link>
        </div>
      </div>
    )
  }
}
//
// <Link
//  className="btn signin__form-facebook"
//  role="button"
//  to="/">
//  SIGN IN WITH FACEBOOK
// </Link>
export default withRouter(SignIn);




// <button onClick={this.handleSubmit} className="signin__form-facebook">SIGN IN WITH FACEBOOK</button>
