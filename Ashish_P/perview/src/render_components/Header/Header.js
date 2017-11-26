import "../../styles/stylesheets/header.css";
import logo from "../../styles/assets/logo.jpg";
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchPerviewBar from './SearchPerviewBar';
import UserNavContainer from '../../containers/UserNavContainer';
import CreatePerviewModalContainer from '../../containers/CreatePerviewModalContainer';
import * as util from '../../actions/util_actions.js';

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
        <Link to={option.path} className={`flexrow header__navbox ${isActive ? "active" : ""}`} key={`navoptions-${option.text}`}>
          <i className={`fa fa-${option.icon} fa-lg header__navicon`} aria-hidden="true"></i>
          <span className="header__navtext">{option.text}</span>
        </Link>
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

  render() {
    return (
      <div className={`header__container ${this.state ? this.state.scrolled : '' }`}>
        <div className="flexrow header__box">
          <div className="header__logo">
            <Link to="/">
              <img className="header__logoimg" width="40px" src="https://s3.amazonaws.com/perviewimages/logo.png" alt="Header logo"/>
            </Link>
          </div>

          <div className="header__search">
            <SearchPerviewBar
              selectItem={this.selectItem}
              results={this.props.perviewResults}
              fetchResults={this.props.fetchPerviewResults}

              currentUser={this.props.currentUser}
              fetchUser={this.props.fetchUser}
              createItem={this.props.createItem}
              createPerview={this.props.createPerview}
              history={this.props.history}
            />
          </div>

          <div className="flexrow header__nav">
            {this.renderNavOptions()}
          </div>

          <div className="flexrow header__createperview-container">
            {this.renderCreateButton()}
          </div>

          <div className="flexrow header__usernav">
            <div className="header__usernavphoto">
              <UserNavContainer
                imgUrl={this.state.imgUrl}
                logOut={this.props.logOut}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);
