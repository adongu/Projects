import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

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
  }

  handleClick(e) {
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
      {
        path: '/settings',
        text: 'Settings',
        icon: 'gears'
      },
    ];

    return (
      <div className="flexrow header__nav">
        {
          navOptions.map((option) => {
          let currentPath = this.props.match.path;
          let isActive = option.path === currentPath ? true : false;

          return (
              <Link to={option.path}
                className={`flexrow header__navbox ${isActive ? "active" : ""}`}
                key={`navoptions-${option.text}`}>
                <i className={`fa fa-${option.icon} fa-lg header__navicon`} aria-hidden="true"></i>
                <span className="header__navtext">{option.text}</span>
              </Link>
            )
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div className="hamburger__container">
        <span classNme="hamburger__button">
          <i className="fa fa-bars fa-2x"></i>
        </span>

        <Grid onClick={this.handleClick}>
          <Row id=""></Row>
        </Grid>
      </div>
    )
  }
}

export default HamburgerMenu;
