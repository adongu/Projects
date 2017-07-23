import React from 'react';
import { withRouter } from 'react-router-dom';
import SignInContainer from './SignInContainer';
import HeaderContainer from './HeaderContainer';
import NavBar from '../render_components/NavBar/NavBar';

const App = (props) => {
  let toRender = null;
  console.log(props);
  if(props.location.pathname !== '/signin'){
    toRender = (
      <div>
        <HeaderContainer />
        <NavBar />
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


export default App;
