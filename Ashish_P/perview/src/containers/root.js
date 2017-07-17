import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import HomePage from '../render_components/Homepage/HomePage';
import MyPerviews from '../render_components/MyPerviews/MyPerviews';
import FavoritePerviews from '../render_components/FavoritePerviews/FavoritePerviews';
// import HomePageContainer from './HomePageContainer';

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
        <div>
          <Route path="/" component={App}
          onEnter={_ensureLoggedIn}/>
          <Route exact path="/" component={HomePage}/>
          <Route path="/myperviews" component={MyPerviews}/>
          <Route path="/favorites" component={FavoritePerviews}/>
        </div>
      </BrowserRouter>
    </Provider>
  )
};

export default Root;
