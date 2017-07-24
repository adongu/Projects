import "../../styles/stylesheets/usernav.css";
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

  class UserNav extends React.Component {
  // const signOut = () => {
  // }
  shouldComponentUpdate (nextProps, nextState) {
    return {

    }
  }

  render () {
    return (
      <ButtonToolbar>
        <DropdownButton bsStyle="default" title={<img src="https://www.juicedb.com/img/user/temp-user-128.jpg" className="usernav__img"/>} noCaret pullRight id="dropdown-pull-right" className="usernav__dropdown">
          <MenuItem active componentClass="span" eventKey="1"><Link to="/myperviews" activeClassName="active">My Perviews</Link></MenuItem>
          <MenuItem active componentClass="span" eventKey="2"><Link to="/favorites" activeClassName="active">Favorite Perviews</Link></MenuItem>
          <MenuItem eventKey="3" activeClassName="active">Settings</MenuItem>
          <MenuItem eventKey="4" activeClassName="active">Sign Out</MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}
export default withRouter(UserNav);



//
//
