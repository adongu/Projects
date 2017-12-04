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
  // console.log('Auth rest of props', restProps)
  // componentWillMount() {
  //   if (this.props.path !== '/home') {
  //     this.setState({ previousPath: this.props.path })
  //     this.props.updatePreviousPath(this.props.path);
  //   }
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //
  // }

  render () {
    const {
      component: Component,
      path,
      loggedIn,
      previousPath,
      ...restProps,
    } = this.props;

    if (!loggedIn) {
      console.log('Auth - not loggedin', this.props.previousPath);

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

// renders component if logged in, otherwise redirects to the login page
// const Protected = ({component: Component, path, loggedIn, ...restProps}) => {
class Protected extends Component {

  // const location = {
  //   pathname: '/home',
  //   state: { from: path }
  // }
  componentWillMount() {
    // if (this.props.path !== '/home') {
      // this.setState({ previousPath: this.props.path })
      this.props.updatePreviousPath(this.props.path);
      console.log('Protected - componentWillMount', this.props.path)
    // }
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
      // if (restProps.location.state !== '/home') {
        // restProps.history.push(restProps.location).prevProps
    // } else {
      console.log(`Protected - Render ${this.props.previousPath}`)

      return (
        <Route path={path} render={(props) => (
          <div>
            <HeaderContainer />
            <Component {...props}/>
            <Footer />
          </div>
        )}/>
      );

      // restProps.history.push(location);
      // restProps.history.goBack();
      // return  <div />
    }
    console.log('Protected - redirect to /home')
    return  <Redirect to='/home'/>
  }
}
// access the Redux state to check if the user is logged in
const mapStateToProps = state => {
  // console.log('mapStateToProps', state)
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
