import React from 'react';
import SignInContainer from './SignInContainer';
import HeaderContainer from './HeaderContainer';
import NavBar from '../render_components/NavBar/NavBar';
import HomePageContainer from './HomePageContainer';

const App = ({ children }) => {
  let toRender = null;
  if(!this.props){
    toRender = (
      <div>
        <HeaderContainer />
        <NavBar />
        <HomePageContainer />
      </div>
    );
  } else {
    toRender = (
      <SignInContainer />
    )
  }

  return(
    <div className="App">
      { toRender }
      { children }
    </div>
  );
}


export default App;
