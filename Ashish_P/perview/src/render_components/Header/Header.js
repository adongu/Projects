import "../../styles/stylesheets/header.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar'
import UserNav from './UserNav'

const Header = ({currentUser = "Susan"}) => {
  return (
    <div className="header__container">
      <div className="row header__box">
        <div className="header__logo">
          <img className="header__logoimg" width="40px" src="https://s-media-cache-ak0.pinimg.com/originals/0d/a4/83/0da483f1a56d7c5ba8df57d156c4a371.jpg"/>
        </div>
        <div className="header__search">
          <SearchBar />
        </div>
        <div className="row header__usernav">
          <div className="header__greetings">
            Hello, { currentUser }!
          </div>
          <div className="header__usernavphoto">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header);
