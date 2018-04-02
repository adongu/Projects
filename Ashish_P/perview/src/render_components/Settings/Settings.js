import "../../styles/stylesheets/Settings/settings.css";
import React from 'react';
import NavBarContainer from '../../containers/NavBarContainer.js';
import { withRouter } from 'react-router-dom';
import * as util from '../../actions/util_actions.js';
import { Grid, Row, Col } from 'react-bootstrap';

class Settings extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      copySuccess: "Copy",
      currentUser: {}
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
    this.setState({ currentUser: this.props.currentUser})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser !== nextProps.currentUser) {
      this.setState({ currentUser: nextProps.currentUser })
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
      <Col className="flexrow settings__userbox">
        <div className="settings__userimgcontainer">
          <div className="settings__userimgbox">
            <img className="settings__userimg" src={util.generateUserImageUrl(currentUser.facebookId, 'square')} alt="User" />
          </div>
        </div>
        <div className="settings__username">
          {currentUser.fullName}
        </div>
      </Col>
    )
  }

  renderSocialNetworks (currentUser) {
    return (
      <Col className="settings__networks">
        <p className="settings__networks-header">
          Active Social Networks
        </p>

        <div className="settings__networks-facebook">
          <i className="fa fa-facebook fa-4x settings__networks-facebookicon" aria-hidden="true"></i>

          <div className="settings__networks-facebooktext">
            Facebook
          </div>
        </div>
      </Col>
    )
  }

  renderInviteUrl (currentUser) {
    return (
      <Col className="settings__invitebox">
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
      </Col>
    )
  }

  renderTotalPoints (currentUser) {
    return (
      <Col className="settings__points">
        <p className="settings__points-header">
          Total Earnings
        </p>

        <div className="settings__points-box">
          <i className="fa fa-trophy fa-3x settings__points-icon" aria-hidden="true"></i>
          <span className="settings__points-number">
            {currentUser.points} points ({currentUser.earnings})
          </span>
        </div>
      </Col>
    )
  }

  renderNumberPerviews (currentUser) {
    return (
      <Col className="settings__perviews">
        <p className="settings__perviews-header">
          Total Perviews
        </p>

        <div className="settings__perviews-number">
          {currentUser.numPerviews}
        </div>
      </Col>
    )
  }

  renderIsBetaUser (currentUser) {
    return (
      <Col className="settings__perviews">
        <p className="settings__perviews-header">
          Beta Status
        </p>

        <div className="settings__perviews-number">
          {currentUser.beta}
        </div>
      </Col>
    )
  }

  render() {
    if (this.state.currentUser) {
      let currentUser = this.state.currentUser;

      return(
        <Grid className="settings__container">
          <NavBarContainer />

          <div className="flexcolumn settings__box">
            <Row className="flexrow settings__row-top">
              {this.renderProfile(currentUser)}

              {this.renderSocialNetworks(currentUser)}
            </Row>

            <Row className="flexrow settings__row-bottom">
              {this.renderTotalPoints(currentUser)}

              {this.renderNumberPerviews(currentUser)}
            </Row>
          </div>
        </Grid>
      )
    } else {
      return(
        <Grid className="settings__container">
          <NavBarContainer />

          No User Found :(
        </Grid>
      )
    }
  }

  return;
}

export default withRouter(Settings);
