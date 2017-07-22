import "../../styles/stylesheets/usernav.css";
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, DropdownButton, MenuItem, ButtonToolbar, Glyphicon } from 'react-bootstrap';

  const UserNav = () => {

  const signOut = () => {

  }

  return (
    <ButtonToolbar>
      <DropdownButton bsStyle="default" title={<img src="https://www.juicedb.com/img/user/temp-user-128.jpg" className="usernav__img"/>} noCaret pullRight id="dropdown-pull-right" className="usernav__dropdown">
        <MenuItem eventKey="1"><Link to="/myperviews">My Perviews</Link></MenuItem>
        <MenuItem eventKey="2"><Link to="/myperviews">Favorite Perviews</Link></MenuItem>
        <MenuItem eventKey="3">Settings</MenuItem>
        <MenuItem eventKey="4">Sign Out</MenuItem>
      </DropdownButton>
    </ButtonToolbar>
  );
}
export default withRouter(UserNav);



//
//
