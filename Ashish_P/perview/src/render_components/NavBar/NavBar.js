import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";
import CreatePerview from "../CreatePerviews/Modal";

const NavBar = ({ pageTitle = "Check the Perviews of your friends!", canCreatePerviews = true }) => {

  const renderCreateButton = () => {
    if (canCreatePerviews) {
      return (
        <CreatePerview />
      )
    }
  }

  return (
    <div className="navbar__container">
      <div className="flexrow navbar__box">
        <div className="navbar__title">
          {pageTitle}
        </div>
        { renderCreateButton() }
    </div>
  </div>
  )
}

export default withRouter(NavBar);
