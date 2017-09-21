import "../../styles/stylesheets/setting.css";
import React from 'react';
import NavBarContainer from '../../containers/NavBarContainer.js';
import { withRouter } from 'react-router-dom';

class Settings extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      copySuccess: "Copy",
      user: {}
    }

    this.performCopyUrl = this.performCopyUrl.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.renderSocialNetworks = this.renderSocialNetworks.bind(this);
    this.renderTotalPoints = this.renderTotalPoints.bind(this);
    this.renderNumberPerviews = this.renderNumberPerviews.bind(this);
    this.renderIsBetaUser = this.renderIsBetaUser.bind(this);
    this.renderInviteUrl = this.renderInviteUrl.bind(this);
  }

  componentWillMount() {
    this.setState({ user: this.props.currentUser})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser !== nextProps.currentUser) {
      this.setState({ user: nextProps.currentUser })
    }
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

  renderProfile (currentUser) {
    return (
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
    )
  }

  renderSocialNetworks (currentUser) {
    return (
      <div className="settings__networks">
        <p className="settings__networks-header">
          Active Social Networks
        </p>

        <div className="settings__networks-facebook">
          <i className="fa fa-facebook fa-4x settings__networks-facebookicon" aria-hidden="true"></i>

          <div className="settings__networks-facebooktext">
            Facebook
          </div>
        </div>
      </div>
    )
  }

  renderInviteUrl (currentUser) {
    return (
      <div className="settings__invitebox">
        <p className="settings__invite-text">
          Share your Link to gain points!
        </p>

        <form className="flexcolumn settings__inviteform">
          <div className="settings__invite-center">
            <input className="settings__invite-id" value={currentUser.inviteCode} />
          </div>

          <span onClick={this.performCopyUrl} className="settings__invite-copy">
            {this.state.copySuccess}
          </span>
        </form>
      </div>
    )
  }

  renderTotalPoints (currentUser) {
    return (
      <div className="settings__points">
        <p className="settings__points-header">
          Total Earnings
        </p>

        <div className="settings__points-box">
          <i className="fa fa-trophy fa-3x settings__points-icon" aria-hidden="true"></i>
          <span className="settings__points-number">
            {currentUser.points} points ({currentUser.earnings})
          </span>
        </div>
      </div>
    )
  }

  renderNumberPerviews (currentUser) {
    return (
      <div className="settings__perviews">
        <p className="settings__perviews-header">
          Total Perviews
        </p>

        <div className="settings__perviews-number">
          {currentUser.numPerviews}
        </div>
      </div>
    )
  }

  renderIsBetaUser (currentUser) {
    return (
      <div className="settings__perviews">
        <p className="settings__perviews-header">
          Beta Status
        </p>

        <div className="settings__perviews-number">
          {currentUser.beta}
        </div>
      </div>
    )
  }


  render() {
    if (this.state.currentUser) {
      let currentUser = this.state.currentUser;

      return(
        <div className="settings__container">
          <NavBarContainer />

          <div className="flexcolumn settings__box">
            <section className="flexrow settings__row-top">
              {this.renderProfile(currentUser)}

              {this.renderSocialNetworks(currentUser)}
            </section>

            <section className="flexrow settings__row-bottom">
              {this.renderTotalPoints(currentUser)}

              {this.renderNumberPerviews(currentUser)}
            </section>
          </div>
        </div>
      )
    } else {
      return(
        <div>
          No User Found :(
        </div>
      )
    }
  }
}

export default withRouter(Settings);
