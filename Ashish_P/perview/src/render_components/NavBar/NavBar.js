import React from 'react';
import { withRouter } from 'react-router-dom';

const NavBar = ({ pageTitle = "Perviews", canCreatePerviews = true }) => {

  const renderCreateButton = () => {
    if (canCreatePerviews) {
      return (
        <button className="nav-bar__create-btn">Create a Perview</button>
      )
    }
  }

  return (
    <div className="nav-bar__container">
      <div className="nav-bar__title">
        {pageTitle}
      </div>
      { renderCreateButton() }
    </div>
  )
}

export default withRouter(NavBar);
