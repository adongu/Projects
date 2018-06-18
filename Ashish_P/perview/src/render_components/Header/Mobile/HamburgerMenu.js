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
        text: 'My Reviews',
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
      <Grid
        componentClass="nav"
        onClick={this.handleNavClick}
        className="hamburger__nav"
      >
        <Row className="hamburger__header color-change">
          <Col
            // xs={6} sm={3}
            mdHidden lgHidden
          >
            Pages & Settings
          </Col>
        </Row>
        {
          navOptions.map((option) => {
          // let currentPath = this.props.match.path;
          // let isActive = option.path === currentPath ? true : false;
            return (
              <div
                // to={option.path}
                // className={`flexrow header__navbox ${isActive ? "active" : ""}`}'
                className="color-change"
                key={`hamburgernav-${option.text}`}
              >
                <Row
                  className="hamburger__options"
                >
                    <Col
                      xs={1} sm={1}
                      mdHidden lgHidden
                      componentClass='span'
                    >
                      <span>
                        <i className={`fa fa-${option.icon} fa-lg`} aria-hidden="true"></i>
                      </span>
                    </Col>
                    <Col
                      xs={5} sm={2}
                      mdHidden lgHidden
                      componentClass='span'
                    >
                      {option.text}
                    </Col>
                  </Row>
              </div>
            )
          })
        }

        <Row
          onClick={this.handleLogout}
          className="hamburger__options color-change"
        >
          <Col
            xs={1} sm={1}
            mdHidden lgHidden
          >
            <i className="fa fa-power-off usernav__option-icon" aria-hidden="true"></i>
          </Col>
          <Col
            xs={5} sm={2}
            mdHidden lgHidden
          >
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
