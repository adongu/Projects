import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../../containers/NavBarContainer.js';
import NarrowPerviewContainer from '../../containers/NarrowPerviewContainer';

class SolicitPerviews extends Component {
  render() {
    return (
      <div>
        <NavBarContainer />

        <NarrowPerviewContainer />
      </div>
    )
  }
}

export default withRouter(SolicitPerviews);
