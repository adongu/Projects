import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import SignInContainer from './SignInContainer';
// import SignIn from '../render_components/Sign_in/SignIn';

const Root = ({ store }) => {
  const _ensureLoggedIn = () => {
  }

  const _redirectIfLoggedIn = () => {
  }
  console.log(store);
  return (
    <Provider store={ store }>
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <Switch>
          <Route exact path="/" component={ SignInContainer } />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
};

export default Root;
