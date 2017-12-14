import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../../containers/NavBarContainer.js';
import NarrowPerviewContainer from '../../containers/NarrowPerviewContainer';

class SolicitPerviews extends Component {
  componentDidMount() {
    this.props.fetchSolicitPerviews(Number(this.props.match.params.perview_id));
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.requestLoading !== this.props.requestLoading) {
      this.setState({
        requestLoading: nextProps.requestLoading
      })
    }

    if (nextProps.fetchingUpdate !== this.props.fetchingUpdate) {
      this.setState({
        fetchingUpdate: nextProps.fetchingUpdate
      })

      if (this.state.fetchingUpdate) {
        this.props.fetchSolicitPerviews(Number(this.props.match.params.perview_id));
      }
    }
  }

  render() {
    return (
      <div>
        <NavBarContainer
          history = {this.props.history}
          solicit={this.props.perview}
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
          toRenderUserProfile={true}
        />
      </div>
    )
  }
}

export default withRouter(SolicitPerviews);
