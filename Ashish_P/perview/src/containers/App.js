import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderContainer from './HeaderContainer';

const App = (props) => {
  let toRender = null;
  console.log(props);
  if(props.location.pathname !== '/signin'){
    toRender = (
      <div>
        <HeaderContainer />
      </div>
    );
  } else {
    toRender = null;
  }

  return(
    <div className="App">
      { toRender }
      {props.children}
    </div>
  );
}


export default withRouter(App);
