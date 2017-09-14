import "../../styles/stylesheets/setting.css";
import React from 'react';
import NavBarContainer from '../../containers/NavBarContainer.js';
import { withRouter } from 'react-router-dom';

class Settings extends React.Component{
  constructor(props) {
    super(props)

    // this.performCopyUrl = this.performCopyUrl.bind(this)
    this.state = {
      copySuccess: ""
    }
  }


  componentWillMount() {
    this.props.fetchUser()
    .then(() => {
      this.props.fetchNumPerviews();
    });
  }

  performCopyUrl (e) {
    this.textArea.select();
    document.execCommand('copy');
    e.target.focus();
    this.setState({ copySuccess: "Copied Successful!" });
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
                  <textarea className="settings__invite-id" value={currentUser.inviteCode}></textarea>
                  <button className="settings__copy-btn">Copy Invite Url</button>
                </form>
                <p className="settings__copy-success">{this.state.copySuccess}</p>
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
