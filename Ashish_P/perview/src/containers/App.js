import React from 'react';
import SignInContainer from './SignInContainer';
import HeaderContainer from './HeaderContainer';


const App = ({ children }) => {
  let toRender = null;
  if(!this.props){
    toRender = (
      <HeaderContainer />
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
