import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import Footer from '../render_components/Footer/Footer';

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
const Auth = ({component: Component, path, loggedIn, ...restProps}) => {
  console.log('Auth path', path)
  console.log('Auth rest of props', restProps)
  return (
    <Route path={path} render={(props) => (
      !loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={path === '/home' ? "/" : path}/>
      )
    )}/>
  );
}

// renders component if logged in, otherwise redirects to the login page
const Protected = ({component: Component, path, loggedIn, ...restProps}) => {
  console.log('Protected', path)
  if (loggedIn) {
    if (restProps.location.state) {
      restProps.history.push(restProps.location.state)
    } else {
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
  }
  const location = {
    pathname: '/home',
    state: { from: path }
  }

  // restProps.history.push(location);
  // restProps.history.goBack();
  return  <Redirect to='/home'/>
  // return  <div />
}
// access the Redux state to check if the user is logged in
const mapStateToProps = state => {
  // console.log('mapStateToProps', state)
  return { loggedIn: Boolean(state.session.currentUser) };
}

// connect Auth to the redux state
export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

// connect Protected to the redux state
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
