import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../../containers/NavBarContainer.js';
import NarrowPerviewContainer from '../../containers/NarrowPerviewContainer';

class SolicitPerviews extends Component {
  componentDidMount() {
    if (!this.props.perviews) {
      this.props.fetchSolicitPerviews();
    }
  }

  render() {
    return (
      <div>
        <NavBarContainer
          perview={this.props.perview}
        />

        <NarrowPerviewContainer
          currentUserId={this.props.currentUser.id}
          perviews={this.props.perviews}
          editPerview={this.props.editPerview}
          deletePerview={this.props.deletePerview}
          bookmarkPerview={this.props.bookmarkPerview}
          unbookmarkPerview={this.props.unbookmarkPerview}
          likePerview={this.props.likePerview}
          unlikePerview={this.props.unlikePerview}
        />
      </div>
    )
  }
}

export default withRouter(SolicitPerviews);
