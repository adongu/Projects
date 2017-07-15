import React from 'react';

const SignIn = (props) => {
  return (
    <div className="signin__logo">
      <img src=""></img>
    </div>
    <div className="signin__body">
      <div className="signin__body-welcome">
        Welcome to Perview
      </div>
      <div className="signin__body-message">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
      <form className="oauth__signin_form">
        <button className="oauth__signin--facebook">SIGN IN WITH FACEBOOK</button>
      </form>
    </div>
  )
}
