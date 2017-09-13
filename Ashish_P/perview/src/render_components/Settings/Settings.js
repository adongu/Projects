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
                <div className="settings_userimgbox">
                  <img className="settings__userimg" src={currentUser.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User" />
                </div>
                <div className="settings__username">
                  {currentUser.fullName}
                </div>
              </div>
              <span className="settings__invite">
                <p>Invite URL</p>
                <div>{currentUser.inviteCode}</div>
              </span>
            </section>

            <section className="flexrow settings__row-bottom">
              <span className="settings__networks">
                <p>Active Social Networks</p>
                <div>networks</div>
              </span>
              <span className="settings__perviews">
                <p>Total PerViews</p>
                <div>{this.props.numPerviews}</div>
              </span>
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
