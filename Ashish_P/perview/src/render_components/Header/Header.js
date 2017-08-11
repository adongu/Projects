import "../../styles/stylesheets/header.css";
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchPerviewBar from './SearchPerviewBar';
import UserNavContainer from '../../containers/UserNavContainer';
import logo from "../../styles/assets/logo.jpg";

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
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    this.validateRedirect();
  }

  componentDidMount() {
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

  handleScroll() {
    if (window.scrollY > 50) {
      this.setState({scrolled: 'scrolled'})
    } else {
      this.setState({scrolled: ''})
    }
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
          <div className="header__search">
            <SearchPerviewBar
              results={this.props.results}
              fetchResults={this.props.fetchResults} />
          </div>
          <div className="flexrow header__usernav">
            <div className="header__greetings">
              Hello, {this.state.fName}!
            </div>
            <div className="header__usernavphoto">
              <UserNavContainer imgUrl={this.state.imgUrl} logOut={this.props.logOut} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);
