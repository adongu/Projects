import React from 'react';
import NavBar from '../NavBar/NavBar';
import { withRouter } from 'react-router-dom';


class Settings extends React.Component{
  constructor(props) {
    super(props);
  }
  //
  // componentWillMount() {
  //   this.props.fetchUser()
  // }

  render() {
    return(
      <div className="settings__container">
          <section className="settings__row-top">
            <div className="settings__user">
              <span>Picture</span>
              <span>Name</span>
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
