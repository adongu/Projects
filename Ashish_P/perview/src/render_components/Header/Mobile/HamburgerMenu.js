import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
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
  }

  handleNavClick(e) {
    console.log("event.target", e.target.id)
    this.setState({ isOpen: false });

  }

  handleHamburgerClick() {
    console.log('this.state.isopen', this.state.isOpen);
    // this.setState((_prevProps, prevState) => { isOpen: !prevState.isOpen });
    this.setState({ isOpen: !this.state.isOpen });
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
        icon: 'gears'
      },
    ];

    return (
      <Grid onClick={this.handleNavClick} className="hamburgernav__container">
        {
          navOptions.map((option) => {
          // let currentPath = this.props.match.path;
          // let isActive = option.path === currentPath ? true : false;

          return (
              <Row
                key={`hamburgernav-${option.text}`}
              >
                <Col>
                  <Link to={option.path}
                    // className={`flexrow header__navbox ${isActive ? "active" : ""}`}
                  >
                    <i className={`fa fa-${option.icon} fa-lg header__navicon`} aria-hidden="true"></i>
                    <span
                      // className="header__navtext"
                    >
                      {option.text}
                    </span>
                  </Link>
                </Col>
              </Row>
            )
          })
        }
      </Grid>
    )
  }

  render() {
    return (
      <div className="hamburger__container">
        <span onClick={this.handleHamburgerClick} className="hamburger__button">
          <i className="fa fa-bars fa-2x"></i>
        </span>

        {this.state.isOpen === true &&
          this.renderNavList()
        }
      </div>
    )
  }
}

export default HamburgerMenu;
