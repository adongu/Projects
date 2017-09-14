import "../../styles/stylesheets/setting.css";
import React from 'react';
import NavBarContainer from '../../containers/NavBarContainer.js';
import { withRouter } from 'react-router-dom';

class Settings extends React.Component{

  componentWillMount() {
    this.props.fetchUser()
    .then(() => {
      this.props.fetchNumPerviews();
    });
  }
  // "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  render() {
    let currentUser;
    if (this.props.currentUser) {
      currentUser = this.props.currentUser;

      return(
        <div className="settings__container">
          <NavBarContainer />

          <div className="flexcolumn settings__box">
            <section className="flexrow settings__row-top">
              <div className="flexrow settings__userbox">
                <div className="settings__userimgcontainer">
                  <div className="settings__userimgbox">
                    <img className="settings__userimg" src={currentUser.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User" />
                  </div>
                </div>
                <div className="settings__username">
                  {currentUser.fullName}
                </div>
              </div>

              <div className="settings__invitebox">
                <p className="settings__invite-text">Invite URL - share to gain points!</p>
                <p className="settings__invite-id">{currentUser.inviteCode}</p>
                <button className="settings__invite-copy">Copy Invite Url</button>
              </div>
            </section>

            <section className="flexrow settings__row-bottom">
              <div className="settings__networks">
                <p>Active Social Networks</p>
                <div>networks</div>
              </div>

              <div className="settings__perviews">
                <p>Total PerViews</p>
                <div>{this.props.numPerviews}</div>
              </div>
            </section>
          </div>
        </div>
      )
    } else {
      return(
        <div>
          No User Found
        </div>
      )
    }

  }
}

export default withRouter(Settings);
