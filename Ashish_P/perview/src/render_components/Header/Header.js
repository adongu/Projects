import "../../styles/stylesheets/header.css";
import logo from "../../styles/assets/logo.jpg";
import React from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import SearchPerviewBar from './SearchPerviewBar';
import UserNavContainer from '../../containers/UserNavContainer';
import CreatePerviewModal from "./CreatePerviews/CreatePerviewModal";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      userId: null,
      imgUrl: "https://www.juicedb.com/img/user/temp-user-128.jpg",
      scrolled: ''
    }

    this.validateRedirect = this.validateRedirect.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.renderCreateButton = this.renderCreateButton.bind(this);
  }

  componentWillMount() {
    // this.validateRedirect();
  }

  componentDidMount() {
    this.props.fetchUser();
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentUser) {
      let user = nextProps.currentUser;
      this.setState({
        fName: user.firstName,
        imgUrl:  user.facebookProfilePictureUrl.replace(/\/picture$/, ""),
        isFetching: false
      })
    }
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  validateRedirect() {
    this.props.fetchUser()
    .then(() => {
      if (this.props.currentUser === null) {
        this.props.history.replace({ pathname: '/signin' });
      } else {
        let user = this.props.currentUser;
        this.setState({
          fName: user.firstName,
          imgUrl: user.facebookProfilePictureUrl.replace(/\/picture$/, "")
        })
      }
    })
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
    return (
      <div>
        <span>
          <Link to="/myperviews" className="headers__menuitem">
            My Perviews
          </Link>
        </span>
        <span>
          <Link to="/favorites" className="headers__menuitem">
            Favorites
          </Link>
        </span>

      </div>
    )
  }

  renderCreateButton () {
    return (
      <CreatePerviewModal
        currentUser={this.props.currentUser}
        results={this.props.itemResults}
        fetchUser={this.props.fetchUser}
        fetchResults={this.props.fetchItemResults}
        createItem={this.props.createItem}
        createPerview={this.props.createPerview}
        selectedItem={this.props.selectedItem}
      />
    )
  }

  render() {
    return (
      <div className={`header__container ${this.state ? this.state.scrolled : '' }`}>
        <div className="flexrow header__box">
          <div className="header__logo">
            <Link to="/">
              <img className="header__logoimg" width="40px" src={logo} alt="Header logo"/>
            </Link>
          </div>

          {this.renderNavOptions()}
          <div className="header__search">
            <SearchPerviewBar
              selectItem={this.selectItem}
              results={this.props.perviewResults}
              fetchResults={this.props.fetchPerviewResults}
            />
          </div>

          <div className="flexrow header__usernav">
            <div className="header__usernavphoto">
              <UserNavContainer
                imgUrl={this.state.imgUrl}
                logOut={this.props.logOut}
              />
            </div>

            {this.renderCreateButton()}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);
