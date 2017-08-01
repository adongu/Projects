import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";
import CreatePerview from "../CreatePerviews/Modal";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "",
      canCreatePerviews: true
    }

    this.renderCreateButton = this.renderCreateButton.bind(this);
    this.updatePageTitle = this.updatePageTitle.bind(this);
  }


  componentDidMount() {
    this.updatePageTitle(this.props)
  }

  shouldComponentUpdate (nextProps, nextState) {
    this.updatePageTitle(nextProps);
  }

  updatePageTitle(props) {
    if (props.location === '/myperviews') {
      this.setState({pageTitle: "My Perviews", canCreatePerviews: false})
    } else if(props.location === '/favorites') {
      this.setState({pageTitle: "Saved Perviews", canCreatePerviews: false})
    } else {
      this.setState({pageTitle: "Check the Perviews of your friends!"})
    }
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
    console.log(this.state.pageTitle);
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
