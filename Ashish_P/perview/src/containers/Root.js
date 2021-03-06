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
import SolicitsPerviewsContainer from './SolicitsPerviewsContainer';
import LandingPageContainer from './LandingPageContainer';
import { ProtectedRoute, AuthRoute } from '../util/route_util';
import withTracker from '../withTracker';


const Root = ({ store }) => {
  return (
    <Provider store={ store }>
       <BrowserRouter>
          <Switch>
            <AuthRoute component={withTracker(SignInContainer)} exact path="/signin" />
            <AuthRoute component={withTracker(LandingPageContainer)} exact path="/home" />
            <ProtectedRoute component={withTracker(HomePageContainer)} exact path="/"/>
            <ProtectedRoute component={withTracker(MyPerviewsContainer)} exact path="/myperviews"/>
            <ProtectedRoute component={withTracker(FavoritePerviewsContainer)} exact path="/favorites"/>
            <ProtectedRoute component={withTracker(SettingsContainer)} exact path="/settings"/>
            <ProtectedRoute component={withTracker(SolicitsPerviewsContainer)} exact path="/solicits/:perview_id"/>
            <ProtectedRoute component={withTracker(ItemPerviewsContainer)} exact path="/item/:item_id"/>
            <ProtectedRoute component={withTracker(FriendPerviewsContainer)} exact path="/friend/:friend_id"/>
            <Route render={() => (
              <p>404 Page Not Found</p>
            )}/>
          </Switch>
      </BrowserRouter>
    </Provider>
  )
};

export default Root;
