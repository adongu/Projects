import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import HomePageContainer from './HomePageContainer';
import FavoritePerviewsContainer from './FavoritePerviewsContainer';
import MyPerviewsContainer from './MyPerviewsContainer';
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
            <App {...store.session}/>
            <Switch>
              <Route exact path="/" component={HomePageContainer} />
              <Route path="/signin" component={SignInContainer}/>
              <Route path="/myperviews" component={MyPerviewsContainer}/>
              <Route path="/favorites" component={FavoritePerviewsContainer}/>
              <Route path="/item/:item_id" component={HomePageContainer}/>
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
