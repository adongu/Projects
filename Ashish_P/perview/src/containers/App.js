import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderContainer from './HeaderContainer';
import NavBarContainer from './NavBarContainer';

const App = (props) => {
  let toRender = null;
  if(props.location.pathname !== '/signin'){
    toRender = (
      <div>
        <HeaderContainer />
        <NavBarContainer />
      </div>
    );
  } else {
    toRender = null;
  }

  return(
    <div className="App">
      { toRender }
    </div>
  );
}


export default withRouter(App);
