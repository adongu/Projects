import React from 'react';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../actions/session_actions.js';
import { Route, withRouter } from 'react-router-dom'
/**
 * Higher-order component (HOC) to wrap restricted pages
 */
class PrivateRoute(BaseComponent) extends React.Component {
  componentWillMount() {
    this.checkAuthentication(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
        this.checkAuthentication(nextProps);
    }
  }
  checkAuthentication(params) {
    console.log("check authentication");
    const { history } = params;
    // fetchUser()
    //   .catch(e => history.replace({ pathname: '/singin' }));
  }

  render() {
    return (
      <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }}/>
          )
        )}
      />
    )
  }
}

export default withRouter(PrivateRoute);
