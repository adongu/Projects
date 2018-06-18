import "../../styles/stylesheets/Header/header.css";
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchPerviewBar from './SearchPerviewBar';
import CreatePerviewModalContainer from '../../containers/CreatePerviewModalContainer';
import SignInModalContainer from '../../containers/SignInModalContainer';
import UserNavContainer from '../../containers/UserNavContainer';
import HamburgerMenu from './Mobile/HamburgerMenu';
import * as util from '../../actions/util_actions';
import { Grid, Row, Col } from 'react-bootstrap';
import logo from '../../styles/assets/logo2.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      userId: null,
      imgUrl: "https://www.juicedb.com/img/user/temp-user-128.jpg",
      scrolled: '',
      showMobileSearch: false,
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
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentUser && nextProps.currentUser !== this.props.currentUser) {
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.scrolled !== nextState.scrolled) {
  //     return true;
  //   }
  //
  //   if (this.props.currentUser !== nextProps.currentUser) {
  //     return true;
  //   }
  //
  //   return false;
  // }

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
        text: 'My Reviews',
        icon: 'star'
      },
      {
        path: '/favorites',
        text: 'Favorites',
        icon: 'bookmark'
      }
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
    // console.log(this.state);

    return (
      <Grid
        componentClass='header'
        className={`header__container ${this.state ? this.state.scrolled : '' }`}
      >
        <Row className="flexrow header__box">
          <Col
            xs={6} sm={9} md={2} lg={2}
            className='header__logo animated rubberBand'
          >
            <Link to='/'>
              <img
                className="header__logoimg"
                // src="https://s3.amazonaws.com/perviewimages/logo.png"
                src={logo}
                alt='logo'
              />
            </Link>
          </Col>
          {this.props.currentUser &&
            <Col
              xsHidden smHidden md={10} lg={10}
              className='header__authnav-box'
            >
              <Col xsHidden smHidden md={4} lg={4}>
                <div className='header__search'>
                  <SearchPerviewBar
                    selectItem={this.selectItem}
                    results={this.props.perviewResults}
                    fetchResults={this.props.fetchPerviewResults}
                  />
                </div>
              </Col>

              <Col
                xsHidden smHidden md={4} lg={3}
                componentClass='nav'
              >
                {this.renderNavOptions()}
              </Col>

              <Col xsHidden smHidden md={3} lg={3}
                >
                  <CreatePerviewModalContainer
                    history={this.props.history}
                  />
              </Col>

              <Col
                xsHidden smHidden md={1} lg={1}
                componentClass='nav'
              >
                <UserNavContainer
                  imgUrl={this.state.imgUrl}
                  logOut={this.props.logOut}
                />
              </Col>
            </Col>
          }

          {!this.props.currentUser &&
            <Col xs={6} sm={4} md={2} lg={2}>
              <SignInModalContainer
                history={this.props.history}
              />
            </Col>
          }
          {/* Mobile menu */}
          {this.props.currentUser &&
            <Col xs={6} sm={3} mdHidden lgHidden
              className="header__mobile"
            >
              <Col xs={4} sm={4} mdHidden lgHidden
                className="mobile__userimage"
              >
                <img src={this.state.imgUrl} alt="User Icon"/>
              </Col>
              <Col xs={4} sm={4} mdHidden lgHidden
                className="mobile__createperview"
              >
                <CreatePerviewModalContainer
                  history={this.props.history}
                  icon={"pen"}
                />
              </Col>
              <Col xs={4} sm={4} mdHidden lgHidden
                className="hamburgernav"
              >
                <HamburgerMenu
                  history={this.props.history}
                  imgUrl={this.state.imgUrl}
                  logOut={this.props.logOut}
                />
              </Col>
            </Col>
          }
        </Row>

        {this.props.currentUser &&
          <Row className="header__mobilesearch">
            <SearchPerviewBar
              selectItem={this.selectItem}
              results={this.props.perviewResults}
              fetchResults={this.props.fetchPerviewResults}
            />
          </Row>
        }
      </Grid>
    )
  }
}

export default withRouter(Header);
