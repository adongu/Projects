import "../../styles/stylesheets/usernav.css";
import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';

class UserNav extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.history.replace({ pathname: '/signin' });
    this.props.logout();
  }

  render () {
    return (
      <ButtonToolbar>
        <DropdownButton bsStyle="default" title={<img src={this.props.imgUrl} className="usernav__img" alt="User Icon"/>} noCaret pullRight id="dropdown-pull-right" className="usernav__dropdown">
          <MenuItem active componentClass="span" eventKey="1"><NavLink to="/myperviews" className="usernav__menuitem">My Perviews</NavLink></MenuItem>
          <MenuItem active componentClass="span" eventKey="2"><NavLink to="/favorites" className="usernav__menuitem">Favorite Perviews</NavLink></MenuItem>
          <MenuItem eventKey="3" className="">Settings</MenuItem>
          <MenuItem eventKey="4" className="" ><button className="userNav__signout" onClick={this.handleLogout}>Sign Out</button></MenuItem>

        </DropdownButton>
      </ButtonToolbar>
    );
  }
}
export default withRouter(UserNav);



//
//
