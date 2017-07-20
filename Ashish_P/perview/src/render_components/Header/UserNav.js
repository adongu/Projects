import React from 'react';
import { withRouter } from 'react-router-dom';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

const UserNav = () => {

  return (
    <ButtonToolbar>
      <DropdownButton bsStyle="default" title={<img src="https://www.juicedb.com/img/user/temp-user-128.jpg"/>} noCaret pullRight id="dropdown-pull-right" className="usernav__dropdown" placeholder="">
        <MenuItem eventKey="1">My Perviews</MenuItem>
        <MenuItem eventKey="2">Favorite Perviews</MenuItem>
        <MenuItem eventKey="3">Settings</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Sign Out</MenuItem>
      </DropdownButton>
    </ButtonToolbar>
  );
}

export default withRouter(UserNav);
