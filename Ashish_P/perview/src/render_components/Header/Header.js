import "../../styles/stylesheets/header.css";
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar'
import UserNavContainer from '../../containers/UserNavContainer';
import logo from "../../styles/assets/logo.jpg";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      userId: null,
      imgUrl: "",
    }

    this.validateRedirect = this.validateRedirect.bind(this);
  }

  componentWillMount() {
    this.validateRedirect();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentUser) {
      let user = nextProps.currentUser;
      this.setState({
        fName: user.firstName,
        img:  user.facebookProfilePictureUrl,
        isFetching: false
      })
    }
  }

  validateRedirect() {
    this.props.fetchuser()
    .then(() => {
      if (this.props.currentUser === null) {
        this.props.history.replace({ pathname: '/signin' });
      } else {
        let user = this.props.currentUser;
        this.setState({
          fName: user.firstName,
          imgUrl: user.facebookProfilePictureUrl
        })
      }
    })
  }


  render() {
    return (
      <div className="header__container">
        <div className="flexrow header__box">
          <div className="header__logo">
            <Link to="/">
              <img className="header__logoimg" width="40px" src={logo} alt="Header logo"/>
            </Link>
          </div>
          <div className="header__search">
            <SearchBar />
          </div>
          <div className="flexrow header__usernav">
            <div className="header__greetings">
              Hello, {this.state.fName}!
            </div>
            <div className="header__usernavphoto">
              <UserNavContainer logout={this.props.logout}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);
