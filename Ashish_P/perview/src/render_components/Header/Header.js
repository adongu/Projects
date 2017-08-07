import "../../styles/stylesheets/header.css";
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar'
import UserNavContainer from '../../containers/UserNavContainer';
import logo from "../../styles/assets/logo.jpg";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.validateRedirect = this.validateRedirect.bind(this);
  }

  componentWillMount() {
    this.validateRedirect();
  }

  validateRedirect() {
    this.props.fetchuser()
    // .then(() => { console.log("after fetchuser", this.props);})
    .catch(e => this.props.history.replace({ pathname: '/signin' }));
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
              Hello, Susan!
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
