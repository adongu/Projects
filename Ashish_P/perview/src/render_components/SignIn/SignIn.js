import '../../styles/stylesheets/signin.css';
import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);
  }

  componentDidMount () {
  }

  componentDidUpdate(newProps) {
    if (newProps.session) {
      console.log(newProps.session);
      // this.redirectIfLoggedIn(newProps.session);
    }
  }

  redirectIfLoggedIn(session) {
    // if (this.props.loggedIn) {
    //   console.log("this.props.loggedIn", this.props);
    //   this.props.router.goBack();
    // } else {
      // console.log("this.props.loggedIn", this.props);
      // this.props.login()
    return (
      <Redirect to={"/"} props={session}/>
    )
    // }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login()
    // .then(() => {
    //   this.props.getUser()
    // })

    // console.log("handlesubmit", this.props);
    // const user = Object.assign({},)
    // this.redirectIfLoggedIn();
    // <Link to="/" />
  }

  render() {
    console.log(this.props);

    const auth_url = "http://localhost:8080/connect/facebook";
    return (
      <div className="signin__container">
        <div className="column signin__box">
          <div className="signin__logo">
            <img className="signin__logoimg" src="https://pmcdeadline2.files.wordpress.com/2016/07/logo-tv-logo.png" alt="logo"/>
          </div>
          <div className="column signin__body">
            <div className="signin__bodywelcome">
              Welcome to Perview
            </div>
            <div className="signin__bodymessage">
              Purchase your favorite products with the trust of your friends
            </div>
            <form className="signin__form" action={auth_url} method="post">
              <input type="hidden" className="scope" value="user_friends" />
              <button type="submit" className="signin__form-facebook">SIGN IN WITH FACEBOOK</button>
            </form>
          </div>
          <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>
        </div>
        <div className="signin__terms">
          Creating an account means you're OK with Perview's <Link className="signin__terms-urls" to="">Terms of Service</Link> and <Link className="signin__terms-urls" to="">Privacy Policy</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);


// <form className="signin__form" action={auth_url} method="post">


// <button onClick={this.handleSubmit} className="signin__form-facebook">SIGN IN WITH FACEBOOK</button>
