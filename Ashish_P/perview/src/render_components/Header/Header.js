import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar'

const Header = ({currentUser = "Susan"}) => {
  return (
    <div className="header__container">
      <div className="header__logo">
        <img className="header__logo-img" width="40px" src="https://s-media-cache-ak0.pinimg.com/originals/0d/a4/83/0da483f1a56d7c5ba8df57d156c4a371.jpg"/>
      </div>
      <div className="header__searchBar">
        <SearchBar />
      </div>
      <div className="header__greetings">
        Hello, { currentUser }!
      </div>
      <div >
      </div>
    </div>
  )
}

export default withRouter(Header);
