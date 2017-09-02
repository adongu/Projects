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
    this.props.history.push('/signin');
    this.props.logOut();
    // this.props.history.replace({ pathname: '/signin' });
  }

  render () {
    return (
      <ButtonToolbar>
        <DropdownButton bsStyle="default" title={<img src={this.props.imgUrl} className="usernav__img" alt="User Icon"/>} noCaret pullRight id="dropdown-pull-right" className="usernav__dropdown">
          <MenuItem active componentClass="span" eventKey="3">
            <NavLink to="/settings" className="usernav__settings">
              <i className="fa fa-cog" aria-hidden="true"></i>
              Settings
            </NavLink>
          </MenuItem>
          <MenuItem eventKey="4" className="usernav__signout" ><button className="userNav__signout-btn" onClick={this.handleLogout}>Sign Out</button></MenuItem>

        </DropdownButton>
      </ButtonToolbar>
    );
  }
}
export default withRouter(UserNav);



//
//
