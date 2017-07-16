import React from 'react';
import { withRouter } from 'react-router-dom';


const Header = ({currentUser = "Susan"}) => {
  return (
    <div className="header__Greetings">
      Hello, { currentUser }!
    </div>
  )
}

export default withRouter(Header);
