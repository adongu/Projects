import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import CreatePerviewModalContainer from '../../../containers/CreatePerviewModalContainer';
import '../../../styles/stylesheets/Header/mobile.css';

class HamburgerMenu extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      paths: {
        home: "home",
        settings: "settings",
      }
    }

    this.handleNavClick = this.handleNavClick.bind(this)
    this.renderNavList = this.renderNavList.bind(this)
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  // shouldComponentUpdate(_nextProps, nextState) {
  //   if (this.state.isOpen !== nextState.isOpen) {
  //     return true;
  //   }
  //   return false;
  // }

  handleNavClick(e) {
    this.setState((prevState, props) => ({ isOpen: false }));

  }

  handleHamburgerClick(e) {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleLogout() {
    this.props.logOut()
    .then(() => {
      this.props.history.replace({ pathname: '/home' });
    })
    .catch(() => {
      this.props.history.replace({ pathname: '/home' });
    })
  }

  renderNavList() {
    const navOptions = [
      {
        path: '/myperviews',
        text: 'My Perviews',
        icon: 'star'
      },
      {
        path: '/favorites',
        text: 'Favorites',
        icon: 'bookmark'
      },
      {
        path: '/settings',
        text: 'Settings',
        icon: 'gear'
      },
    ];

    return (
      <Grid onClick={this.handleNavClick}
        className="hamburger__nav"
      >
        <Row className="hamburger__header">
          <Col xs={12} sm={12}>
            <span>Pages & Settings</span>
          </Col>
        </Row>
        {
          navOptions.map((option) => {
          // let currentPath = this.props.match.path;
          // let isActive = option.path === currentPath ? true : false;
            return (
              <Link to={option.path}
                // className={`flexrow header__navbox ${isActive ? "active" : ""}`}
                key={`hamburgernav-${option.text}`}
              >
                <Row
                  className="hamburger__options"
                >
                    <Col xs={1} sm={1} mdHidden lgHidden>
                      <span>
                        <i className={`fa fa-${option.icon} fa-lg`} aria-hidden="true"></i>
                      </span>
                    </Col>
                    <Col xs={10} sm={10} mdHidden lgHidden>
                      {option.text}
                    </Col>
                  </Row>
              </Link>
            )
          })
        }

        <Row
          onClick={this.handleLogout}
          className="hamburger__signout"
        >
          <Col xs={1} sm={1} mdHidden lgHidden>
            <i className="fa fa-power-off usernav__option-icon" aria-hidden="true"></i>
          </Col>
          <Col xs={9} sm={9} mdHidden lgHidden>
            <span className="usernav__option-text">Sign Out</span>
          </Col>
        </Row>
      </Grid>
    )
  }

  render() {
    // console.log('this.props', this.props)

    return (
      <div className="hamburger__container" onClick={this.handleHamburgerClick}>
        <Col xs={12} sm={12} className="hamburger__button">
          {this.state.isOpen ? (
            <i className="fa fa-close fa-2x"></i>
          ):(
            <i className="fa fa-bars fa-2x"></i>
          )}
        </Col>

        {this.state.isOpen === true &&
          this.renderNavList()
        }
      </div>
    )
  }
}

export default withRouter(HamburgerMenu);
