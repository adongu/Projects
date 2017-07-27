import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";
import CreatePerview from "../CreatePerviews/Modal";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Check the Perviews of your friends!",
      canCreatePerviews: true
    }

    this.renderCreateButton = this.renderCreateButton.bind(this);
  }


  componentDidMount() {
  }

  shouldComponentUpdate () {

  }

  renderNavOption () {
  }

  renderCreateButton () {
    if (this.state.canCreatePerviews) {
      return (
        <CreatePerview />
      )
    }
  }

  render () {
    return (
      <div className="navbar__container">
        <div className="flexrow navbar__box">
          <div className="navbar__title">
            {this.state.pageTitle}
          </div>
          { this.renderCreateButton() }
        </div>
      </div>

    )
  }
}

export default withRouter(NavBar);
