import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";
import CreatePerview from "../CreatePerviews/Modal";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "",
      canCreatePerviews: false
    }

    this.renderCreateButton = this.renderCreateButton.bind(this);
    this.updatePageTitle = this.updatePageTitle.bind(this);
  }


  componentDidMount() {
    this.updatePageTitle(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.updatePageTitle(nextProps);
  }

  updatePageTitle(props) {
    switch (props.location.pathname) {
      case '/myperviews':
        this.setState({pageTitle: "My Perviews"})
        break;
      case '/favorites':
        this.setState({pageTitle: "Saved Perviews"})
        break;
      default:
        this.setState({pageTitle: "Check the Perviews of your friends!", canCreatePerviews: true})
        break;
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
