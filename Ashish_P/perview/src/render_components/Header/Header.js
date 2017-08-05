import "../../styles/stylesheets/header.css";
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar'
import UserNavContainer from '../../containers/UserNavContainer';
import logo from "../../styles/assets/logo.jpg";

const Header = ({currentUser = "Susan"}) => {
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
            Hello, { currentUser }!
          </div>
          <div className="header__usernavphoto">
            <UserNavContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header);
