import React from 'react';
import NavBar from '../NavBar/NavBar';
import { withRouter } from 'react-router-dom';


class Settings extends React.Component{

  componentWillMount() {
    this.props.fetchUser()
    .then(() => {
      this.props.fetchNumPerviews();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser.id !== this.props.currentUser.id) {
      this.props.fetchUser()
      .then(() => {
        this.props.fetchNumPerviews();
      });
    }
  }

  render() {
    let currentUser;
    if (this.props.currentUser) {
      currentUser = this.props.currentUser;
    }

    return(
      <div className="settings__container">
          <section className="settings__row-top">
            <div className="settings__user">
              <span>`${currentUser.facebookProfilePictureUrl.replace(/\/picture$/, "")}`</span>
              <span>`${currentUser.firstName} ${currentUser.lastName}`</span>
            </div>
            <span className="settings__invite">
              <p>Invite URL</p>
              <div>invite URL</div>
            </span>
          </section>

          <section className="settings__row-bottom">
            <span className="settings__networks">
              <p>Active Social Networks</p>
              <div>networks</div>
            </span>
            <span className="settings__perviews">
              <p>Total PerViews</p>
              <div>Total PerViews</div>
            </span>
          </section>
      </div>
    )
  }
}

export default withRouter(Settings);
