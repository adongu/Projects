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
  }

  componentWillMount() {
  }

  performCopyUrl (e) {
    e.preventDefault();
    document.querySelector(".settings__invite-id").select();
    document.execCommand('copy');
    e.target.focus();
    this.setState({ copySuccess: "Copied!" }, () => {
      window.setTimeout(() => this.setState({ copySuccess: "Copy" }), 1300)
    });
  }

  handleChangeInput (e) {

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
                <p className="settings__invite-text">Invite URL - share to gain points!</p>
                <form className="settings__copy" onSubmit={this.performCopyUrl}>
                  <input onChange={this.handleChangeInput} className="settings__invite-id" value={currentUser.inviteCode}></input>
                  <button className="settings__copy-btn">{this.state.copySuccess}</button>
                </form>
              </div>
            </section>

            <section className="flexrow settings__row-bottom">
              <div className="settings__networks">
                <p>Active Social Networks</p>
                <div>Facebook</div>
                <div>Facebook</div>
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
