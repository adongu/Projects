import React from 'react';
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';

const PrivateRoute = ({ component: Component, ...props }) => {

  const validated = (rest) => {
    return () => {
      props.fetchUser()
        .then(() => {
          return (
            <div>
              <HeaderContainer />
              <Component {...rest}/>
            </div>
          )
        })
        .catch(()=> {
          return (
            <Redirect to={{
              pathname: '/signin',
              state: { from: props.location }
            }}/>
          )
        });
      }
  }

  return (
    <Route {...props} render={rest => {
      return (
        <div>
          { validated(rest) }
        </div>
      )
    }}/>
  )
}

export default withRouter(PrivateRoute);
