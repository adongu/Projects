import React from 'react';
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';


const PrivateRoute = ({ component: Component, ...props }) => {
  console.log('props', props);

  const validated = () =>{
    props.fetchUser();
    // .then((response) => {
    return true;
    //
    // })
    // .then(() => {
    //   console.log('props.currentUser', props.currentUser);
    //   // debugger
    //   return !!props.currentUser;
    // });
    // .catch(() => this.props.history.replace({ pathname: '/signin' }));
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
