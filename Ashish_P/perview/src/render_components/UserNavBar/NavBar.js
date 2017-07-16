import React from 'react';
import { withRouter } from 'react-router-dom';

const NavBar = ({ pageTitle, canCreatePerviews = true}) => {
  renderCreateButton() {
    if(canCreatePerviews){
      return (
        <button className="nav-bar__create-btn"></button>
      )
    }
  }

  return (
    <div className="nav-bar__container">
      <div className="nav-bar__title"></div>
      { renderCreateButton() }
    </div>
  )
}

export default withRouter(NavBar);
