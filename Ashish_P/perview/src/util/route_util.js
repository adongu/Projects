import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import Footer from '../render_components/Footer/Footer';
import { updatePreviousPath } from '../actions/session_actions';

// class ScrollToTop extends React.Component {
//   componentDidUpdate(prevProps) {
//     if (this.props.location !== prevProps.location) {
//       window.scrollTo(0, 0);
//     }
//   }
//
//   render() {
//     return this.props.children
//   }
// }
// renders component if logged out, otherwise redirects to the root url
// const Auth = ({component: Component, path, loggedIn, previousPath, updatePreviousPath, ...restProps }) => {

class Auth extends Component {
  render () {
    const {
      component: Component,
      path,
      loggedIn,
      previousPath,
      ...restProps,
    } = this.props;

    if (!loggedIn) {
      // console.log('Auth - not loggedin', this.props.previousPath);

      return (
        <Route path={path} render={(props) => (
            <Component {...props} />
        )}/>
      );
    }

    console.log('Auth - loggedin', this.props.previousPath);

    return (
      <Redirect to={previousPath === '/home' ? "/" : previousPath}/>
    );
  }
}

class Protected extends Component {
  componentDidMount() {
      this.props.updatePreviousPath(this.props.location.pathname);
      // console.log('Protected - componentWillMount', this.props)
  }

  render () {
    const {
      component: Component,
      path,
      loggedIn,
      previousPath,
      ...restProps,
    } = this.props;

    if (loggedIn) {
      // console.log(`Protected - Render ${this.props.previousPath}`)

      return (
        <Route path={path} render={(props) => (
          <div>
            <HeaderContainer />
            <Component {...props}/>
            <Footer />
          </div>
        )}/>
      );
    }
    // console.log('Protected - redirect to /home')
    return  <Redirect to='/home'/>
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    previousPath: String(state.session.previousPath),
  };
}

const mapDispatchToProps = (dispatch, ...ownProps) => {
  return {
    updatePreviousPath: (path) => dispatch(updatePreviousPath(path)),
  }
}

// connect Auth to the redux state
export const AuthRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));

// connect Protected to the redux state
export const ProtectedRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(Protected));
