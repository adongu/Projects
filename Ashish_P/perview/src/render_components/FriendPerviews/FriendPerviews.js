import "../../styles/stylesheets/friendperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../../containers/NavBarContainer.js';
import NarrowPerview from "../PerviewsLayouts/NarrowPerview";

class FriendPerviews extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      requestLoading: false,
      friendId: null
    }

    this.fetchFilteredPerviews = this.fetchFilteredPerviews.bind(this);
  }

  componentWillMount () {
    this.props.fetchFriendPerviews(Number(this.props.match.params.friend_id));
    this.props.fetchCategoryIds();

    this.setState({
      friendId: Number(this.props.match.params.friend_id)
    });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.requestLoading !== this.props.requestLoading) {
      this.setState({
        requestLoading: nextProps.requestLoading
      });
    }

    if (this.props.match.params.friend_id !== nextProps.match.params.friend_id) {
      this.props.fetchItemPerviews(Number(nextProps.match.params.friend_id))

      this.setState({
        itemId: Number(nextProps.match.params.friend_id)
      });
    }
  }

  fetchFilteredPerviews(catetoryId) {
    this.props.fetchFriendPerviews(this.state.friendId, catetoryId);
  }

  render () {
    return (
      <div className="friendperview__container">
        <NavBarContainer
          filterPerviews = {this.fetchFilteredPerviews}
        />

        <div className="friendperview__perviews">
          <NarrowPerview
            perviews = {this.props.perviews}
            />
        </div>
      </div>
    )
  }
}

export default withRouter(FriendPerviews);
