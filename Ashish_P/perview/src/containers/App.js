import React from 'react';
import { withRouter } from 'react-router-dom';
import SignInContainer from './SignInContainer';
import HeaderContainer from './HeaderContainer';
import NavBar from '../render_components/NavBar/NavBar';

const App = (props) => {
  let toRender = null;
  if(!this.props){
    toRender = (
      <div>
        <HeaderContainer />
        <NavBar />
      </div>
    );
  } else {
    toRender = (
      <div>
        <SignInContainer />
      </div>
    )
  }

  return(
    <div className="App">
      { toRender }
      { props.children }
    </div>
  );
}


export default App;
