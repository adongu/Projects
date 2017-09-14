import "../../styles/stylesheets/setting.css";
import React from 'react';
import NavBarContainer from '../../containers/NavBarContainer.js';
import { withRouter } from 'react-router-dom';

class Settings extends React.Component{
  constructor(props) {
    super(props)

    // this.performCopyUrl = this.performCopyUrl.bind(this)
    this.state = {
      copySuccess: "Copy"
    }
    this.performCopyUrl = this.performCopyUrl.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  performCopyUrl (e) {
    e.preventDefault();
    document.querySelector(".settings__invite-id").select();
    document.execCommand('copy');
    e.target.focus();
    this.setState({ copySuccess: "Copied!" }, () => {
      window.setTimeout(() => this.setState({ copySuccess: "Copy" }), 2000)
    });
  }

  handleChangeInput (e) {
    e.preventDefault();
  }

  render() {
    if (this.props.currentUser) {
      let currentUser = this.props.currentUser;

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
                <p className="settings__invite-text">Share your Link to gain points!</p>
                <form className="flexcolumn settings__inviteform">
                  <div className="settings__invite-center">
                    <input className="settings__invite-id" value={currentUser.inviteCode}></input>
                  </div>
                  <span onClick={this.performCopyUrl} className="settings__invite-copy">{this.state.copySuccess}</span>
                </form>
              </div>
            </section>

            <section className="flexrow settings__row-bottom">
              <div className="settings__networks">
                <p className="settings__networks-header">Active Social Networks</p>
                <div className="settings__networks-facebook">
                  <i className="fa fa-facebook fa-4x settings__networks-facebookicon" aria-hidden="true"></i>
                  <div className="settings__networks-facebooktext">Facebook</div>
                </div>
              </div>

              <div className="settings__perviews">
                <p>Total PerViews</p>
                <div>{currentUser.numPerviews}</div>
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
