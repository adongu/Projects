import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import HomePageContainer from './HomePageContainer';
import FavoritePerviewsContainer from './FavoritePerviewsContainer';
import ItemPerviewsContainer from './ItemPerviewsContainer';
import MyPerviewsContainer from './MyPerviewsContainer';
import FriendPerviewsContainer from './FriendPerviewsContainer';
import SettingsContainer from './SettingsContainer';
import SignInContainer from './SignInContainer';
// import RestrictedContainer from './RestrictedContainer';
import PrivateRouteContainer from './PrivateRouteContainer';

const Root = ({ store }) => {
  console.log('root', this);

  return (
    <Provider store={ store }>
       <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
          <div className="root">
            <Switch>
              <Route exact path="/" component={HomePageContainer} />
              <Route path="/signin" component={SignInContainer}/>
              <Route path="/myperviews" component={MyPerviewsContainer}/>
              <Route path="/favorites" component={FavoritePerviewsContainer}/>
              <Route path="/settings" component={SettingsContainer}/>
              <Route path="/item/:item_id" component={ItemPerviewsContainer}/>
              <Route path="/friend/:friend_id" component={FriendPerviewsContainer}/>
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
// <App {...store.session}/>
