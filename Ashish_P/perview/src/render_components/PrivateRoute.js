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
    console.log('run validated');
    return () => {
      props.fetchUser()
      .then((response) => {
        // console.log('props.currentUser', props.currentUser);
        return !!response.currentUser;
      })
      .catch((error) => {
          return this.props.history.replace({ pathname: '/signin' })
        }
      );
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
