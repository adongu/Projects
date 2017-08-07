import "../../styles/stylesheets/usernav.css";
import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';

class UserNav extends React.Component {

  render () {
    console.log("userNav", this.props);
    return (
      <ButtonToolbar>
        <DropdownButton bsStyle="default" title={<img src="https://www.juicedb.com/img/user/temp-user-128.jpg" className="usernav__img" alt="User Icon"/>} noCaret pullRight id="dropdown-pull-right" className="usernav__dropdown">
          <MenuItem active componentClass="span" eventKey="1"><NavLink to="/myperviews" className="usernav__menuitem">My Perviews</NavLink></MenuItem>
          <MenuItem active componentClass="span" eventKey="2"><NavLink to="/favorites" className="usernav__menuitem">Favorite Perviews</NavLink></MenuItem>
          <MenuItem eventKey="3" className="">Settings</MenuItem>
          <MenuItem eventKey="4" className="" onClick={this.props.logout()}>Sign Out</MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}
export default withRouter(UserNav);



//
//
