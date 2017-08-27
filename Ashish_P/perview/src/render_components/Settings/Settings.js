import "../../styles/stylesheets/setting.css";
import React from 'react';
import NavBar from '../NavBar/NavBar';
import { withRouter } from 'react-router-dom';

class Settings extends React.Component{

  componentWillMount() {
    this.props.fetchUser()
    .then(() => {
      this.props.fetchNumPerviews();
      console.log(this.props.numPerviews);
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.currentUser) {
  //     if (nextProps.currentUser.id !== this.props.currentUser.id) {
  //       this.props.fetchUser()
  //       .then(() => {
  //         this.props.fetchNumPerviews();
  //       });
  //     }
  //   }
  // }

  render() {
    let currentUser;
    if (this.props.currentUser) {
      currentUser = this.props.currentUser;

      return(
        <div>
          <NavBar />
          <div className="flexcolumn settings__container">
            <section className="flexrow settings__row-top">
              <div className="flexrow settings__user">
                <div className="settings_portrait">
                  <img className="settings__userimg" src={currentUser.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"></img>
                </div>
                <div className="settings__name">{currentUser.firstName}
                  {currentUser.lastName}
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
