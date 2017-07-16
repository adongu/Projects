import React from 'react';
import SignInContainer from "./SignInContainer";

const App = ({ children }) => {
  return(
    <div className="App">
      <SignInContainer />
      { children }
    </div>
  );
}


export default App;
