import '../../styles/stylesheets/signin.css';
import '../../styles/assets/background.png';
import React from 'react';
import { withRouter } from 'react-router-dom';

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
    this.props.fetchUser();
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
              <img className="signin__logoimg" src="https://s3.amazonaws.com/perviewimages/logo.png" alt="logo"/>
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
                <button type="submit" className="signin__submit-facebook">
                  Continue with Facebook
                </button>

                <p className="signin__submit-msg">
                  We won't post anything on Facebook.
                </p>
              </form>
            </div>
          </div>

          <p className="signin__terms">
            By continuing, you indicate that you have read and agree Perview's
            <a
              href="https://s3.amazonaws.com/tosandpp/2017_9_7_Perview_Terms_of_Service.pdf"
              className="signin__terms-urls"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
              <span>and</span>
            <a
              href="https://s3.amazonaws.com/tosandpp/2017_9_7_Perview_Privacy_Policy.pdf"
              className="signin__terms-urls"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        <div className="signin__background">
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
