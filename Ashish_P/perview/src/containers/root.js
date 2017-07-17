import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import SignInContainer from './SignInContainer';
import HomePageContainer from './HomePageContainer';

const Root = ({ store }) => {
  const _ensureLoggedIn = (nextState, replace) => {
    if(true){
      replace('/home');
    }
  }

  const _redirectIfLoggedIn = (nextState, replace) => {
    if(true){
      replace('/home');
    }
  };

  return (
    <Provider store={ store }>
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <Switch>
          <Route exact path="/" component={ App }
          onEnter={_ensureLoggedIn}/>
          <Route />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
};

export default Root;
