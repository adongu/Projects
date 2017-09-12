import "../../styles/stylesheets/usernav.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';

class UserNav extends React.PureComponent {
  constructor(props) {
    super(props);

    this.redirectToSettings = this.redirectToSettings.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  compon

  redirectToSettings() {
    this.props.history.push('/settings');
  }

  handleLogout() {
    this.props.logOut()
    .then(() => {
      this.props.history.replace({ pathname: '/signin' });
      // this.props.history.push('/signin');
    })
    .catch(() => {
      this.props.history.replace({ pathname: '/signin' });
      // this.props.history.push('/signin');
    })
  }

  render () {
    return (
      <ButtonToolbar>
        <DropdownButton bsStyle="default"
          title={
            <div className="usernav__imgbox">
              <img src={this.props.imgUrl} className="usernav__img" alt="User Icon"/>
            </div>
          }
          noCaret pullRight id="dropdown-pull-right" className="usernav__dropdown">
          <MenuItem className="usernav__option" eventKey="1">
            <div onClick={this.redirectToSettings}
              className="usernav__option" >
              <i className="fa fa-cog" aria-hidden="true"></i>
              <span>Settings</span>
            </div>
          </MenuItem>
          <MenuItem eventKey="4" className="usernav__option" eventKey="2">
            <div onClick={this.handleLogout} className="usernav__signout-btn">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              <span>Sign Out</span>
            </div>
          </MenuItem>

        </DropdownButton>
      </ButtonToolbar>
    );
  }
}
export default withRouter(UserNav);



//
//
