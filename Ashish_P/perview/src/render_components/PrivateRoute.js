import React from 'react';
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';


// const PrivateRoute = ({ component: Component, ...props }) => {
const PrivateRoute = ({ component: Component, ...props }) => {

  const validated = () => {
    return () => {
      return props.fetchUser()
      .then((response) => {
        debugger
        console.log('response.currentUser', !!response.currentUser);
        return !!response.currentUser;
      })
      .catch((error) => {
        debugger
        console.log('hits error');
        return this.props.history.replace({ pathname: '/signin' })
      });
    }
  }

  return (
    <Route {...props} render={rest => (
      validated() ? (
        <div>
          <HeaderContainer />
          <Component {...rest}/>
        </div>
      ) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )
}

export default withRouter(PrivateRoute);

// validated() ? (
//   <div>
//     <HeaderContainer />
//     <Component {...rest}/>
//   </div>
// ) : (
//   <Redirect to={{
//   pathname: '/signin',
//   state: { from: props.location }
//   }}/>
// )
