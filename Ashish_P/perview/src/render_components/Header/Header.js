import "../../styles/stylesheets/header.css";
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchPerviewBar from './SearchPerviewBar';
import CreatePerviewModalContainer from '../../containers/CreatePerviewModalContainer';
import SignInModalContainer from '../../containers/SignInModalContainer';
import UserNavContainer from '../../containers/UserNavContainer';
import * as util from '../../actions/util_actions';
import { Grid, Row, Col, FormGroup, Navbar, NavItem, Nav, MenuItem } from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      userId: null,
      imgUrl: "https://www.juicedb.com/img/user/temp-user-128.jpg",
      scrolled: '',
      navOptions: [
        {
          url: '/myperviews',
          text: 'Personal',
          icon: 'star'
        },
        {
          url: '/favorites',
          text: 'Favorites',
          icon: 'bookmark'
        }
      ]
    }

    this.selectItem = this.selectItem.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.renderNavOptions = this.renderNavOptions.bind(this);
    this.renderCreateButton = this.renderCreateButton.bind(this);
    this.renderHeaderNav = this.renderHeaderNav.bind(this);
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentUser) {
      let user = nextProps.currentUser;
      this.setState({
        fName: user.firstName,
        imgUrl:  util.generateUserImageUrl(user.facebookId, 'square'),
        isFetching: false
      })
    }
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  selectItem( imgUrl, name, price, itemId ) {
    if (itemId) {
      this.props.history.replace({ pathname: `/item/${itemId}`});
    }
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.setState({scrolled: 'scrolled'})
    } else {
      this.setState({scrolled: ''})
    }
  }

  renderNavOptions () {
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
      }
    ];

    return navOptions.map((option) => {
      let currentPath = this.props.match.path;
      let isActive = option.path === currentPath ? true : false;

      return (
        <NavItem>
          <Link to={option.path}
            // className={`flexrow header__navbox ${isActive ? "active" : ""}`}
            key={`navoptions-${option.text}`}>
            <i className={`fa fa-${option.icon} fa-lg header__navicon`} aria-hidden="true"></i>
            <span className="header__navtext">{option.text}</span>
          </Link>
        </NavItem>
      )
    })
  }

  renderCreateButton () {
    return (
      <CreatePerviewModalContainer
        history={this.props.history}
      />
    )
  }

  renderSignInModal () {
    if (!this.props.currentUser) {
      return (
        <SignInModalContainer
          history={this.props.history}
        />
      )
    }

    return (
      <div
        onClick={(e) => e.stopPropagation()}
        // className="header__usernavphoto"
      >
        <UserNavContainer
          imgUrl={this.state.imgUrl}
          logOut={this.props.logOut}
        />
      </div>
    )
  }

  renderHeaderNav () {
    return (
      <Nav
        // className="header__authnav-box"
      >
        <NavItem
          onClick={(e) => e.stopPropagation()}
          className="header__search"
        >
          <SearchPerviewBar
            selectItem={this.selectItem}
            results={this.props.perviewResults}
            fetchResults={this.props.fetchPerviewResults}
          />
        </NavItem>

        <NavItem
          // className="flexrow header__nav"
        >
          {this.renderNavOptions()}
        </NavItem>

        <NavItem
          // className="flexrow header__createperview-container"
        >
          {this.renderCreateButton()}
        </NavItem>
      </Nav>
    )
  }

  render() {
    return (
      <Navbar collapseOnSelect
        // className={`header__container ${this.state ? this.state.scrolled : '' }`}
      >
        <Navbar.Header
          // className="flexrow header__box"
          >
          <Navbar.Brand
            className="header__logo"
          >
            <Link to="/">
              <img
                className="header__logoimg"
                src="https://s3.amazonaws.com/perviewimages/logo.png"
              alt="Header logo"/>
            </Link>
          </Navbar.Brand>

          {this.props.currentUser ?
            (<Navbar.Toggle />)
          :(
            <div className="header__authnav">
              <SignInModalContainer
                history={this.props.history}
              />
            </div>
          )}
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav
            // className="header__authnav-box"
          >
              {this.props.currentUser &&
                <NavItem
                  onClick={(e) => e.stopPropagation()}
                  // className="header__search"
                >
                  <SearchPerviewBar
                    selectItem={this.selectItem}
                    results={this.props.perviewResults}
                    fetchResults={this.props.fetchPerviewResults}
                  />
                </NavItem>
              }

              {this.props.currentUser &&
                <NavItem
                  // className="flexrow header__nav"
                >
                  {this.renderNavOptions()}
                </NavItem>
              }
              {this.props.currentUser &&
                <NavItem
                  // className="flexrow header__createperview-container"
                >
                  {this.renderCreateButton()}
                </NavItem>
              }

            {/* <NavItem
              pullRight
              // expanded={true}
            > */}
              {this.renderSignInModal()}
            {/* </NavItem> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Header);
