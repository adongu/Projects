import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import MyPerviews from '../render_components/MyPerviews/MyPerviews';
import FavoritePerviews from '../render_components/FavoritePerviews/FavoritePerviews';
import HomePageContainer from './HomePageContainer';
import SignInContainer from './SignInContainer';

const Root = ({ store }) => {
  // const _ensureLoggedIn = (nextState) => {
  //   if(true){
  //     return (
  //       <Redirect to={"/signin"}/>
  //     )
  //   }
  // }
  //
  // const _redirectIfLoggedIn = (nextState) => {
  //   if(true){
  //     // replace('/signin');
  //   }
  // };

  return (
    <Provider store={ store }>
       <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
          <div className="root">
          <App/>
          <Switch>
            <Route exact path="/" component={HomePageContainer}/>
            <Route eact path="/signin" component={SignInContainer}/>
            <Route eact path="/myperviews" component={MyPerviews}/>
            <Route path="/favorites" component={FavoritePerviews}/>
            <Route render={() => (
              <p>404 Page Not Found</p>
            )}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
};

export default Root;
// <Route component={SignInContainer}/>

//Testing for passing props down
// <Route path="/" render={(props) => (
//   <App {...props}/>
// )} />
