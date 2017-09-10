import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePageContainer from './HomePageContainer';
import FavoritePerviewsContainer from './FavoritePerviewsContainer';
import ItemPerviewsContainer from './ItemPerviewsContainer';
import MyPerviewsContainer from './MyPerviewsContainer';
import FriendPerviewsContainer from './FriendPerviewsContainer';
import SettingsContainer from './SettingsContainer';
import SignInContainer from './SignInContainer';
import { ProtectedRoute, AuthRoute } from '../util/route_util.js';

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
       <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
          <div className="root">
            <Switch>
              <AuthRoute component={SignInContainer} path="/signin" />
              <ProtectedRoute component={HomePageContainer} exact path="/"/>
              <ProtectedRoute component={MyPerviewsContainer} exact path="/myperviews"/>
              <ProtectedRoute component={FavoritePerviewsContainer} exact path="/favorites"/>
              <ProtectedRoute component={SettingsContainer} exact path="/settings"/>
              <ProtectedRoute component={ItemPerviewsContainer} exact path="/item/:item_id"/>
              <ProtectedRoute component={FriendPerviewsContainer} exact path="/friend/:friend_id"/>
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
