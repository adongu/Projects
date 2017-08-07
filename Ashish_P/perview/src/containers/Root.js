import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import MyPerviews from '../render_components/MyPerviews/MyPerviews';
import FavoritePerviews from '../render_components/FavoritePerviews/FavoritePerviews';
import HomePageContainer from './HomePageContainer';
import SignInContainer from './SignInContainer';
// import RestrictedContainer from './RestrictedContainer';
import Restricted from '../render_components/Restricted';

const Root = ({ store }) => {
  // const Auth = {
  //   isAuthenticated: false,
  //   authenticate(cb) {
  //     this.isAuthenticated = true
  //     setTimeout(cb, 100) // fake async
  //   },
  //   signout(cb) {
  //     this.isAuthenticated = false
  //     setTimeout(cb, 100)
  //   }
  // }

  return (
    <Provider store={ store }>
       <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
          <div className="root">
            <App/>
            <Switch>
              <Route exact path="/" component={HomePageContainer} />
              <Route path="/signin" component={SignInContainer}/>
              <Route path="/myperviews" component={MyPerviews}/>
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
