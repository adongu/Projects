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
import LandingPageContainer from './LandingPageContainer';
import { ProtectedRoute, AuthRoute } from '../util/route_util.js';
import withTracker from '../withTracker';


const Root = ({ store }) => {
  const handlePageChange = () => {
    window.scrollTo(0, 0);
  }

  return (
    <Provider store={ store }>
       <BrowserRouter>
          <Switch>
            {/* <AuthRoute component={LandingPageContainer} exact path="/home" /> */}

            {/* <AuthRoute component={} exact path="/home" /> */}
            <AuthRoute component={withTracker(SignInContainer)} exact path="/signin" />
            <ProtectedRoute component={withTracker(HomePageContainer)} exact path="/"/>
            <ProtectedRoute component={withTracker(MyPerviewsContainer)} exact path="/myperviews"/>
            <ProtectedRoute component={withTracker(FavoritePerviewsContainer)} exact path="/favorites"/>
            <ProtectedRoute component={withTracker(SettingsContainer)} exact path="/settings"/>
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
