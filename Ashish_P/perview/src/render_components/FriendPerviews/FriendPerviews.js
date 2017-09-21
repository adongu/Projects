import "../../styles/stylesheets/FriendPerviews/friendperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../../containers/NavBarContainer';
import FriendHero from "./FriendHero";
import NarrowPerview from "../PerviewsLayouts/NarrowPerview";

class FriendPerviews extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      fetchingUpdate: false,
      requestLoading: false,
      friendId: null
    }

    this.fetchFilteredPerviews = this.fetchFilteredPerviews.bind(this);
  }

  componentWillMount () {
    this.props.fetchFriendPerviews(Number(this.props.match.params.friend_id));

    this.setState({
      friendId: Number(this.props.match.params.friend_id)
    });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.friend_id !== nextProps.match.params.friend_id) {
      let nextFriendId = Number(nextProps.match.params.friend_id);

      this.props.fetchFriendPerviews(nextFriendId)

      this.setState({
        friendId: nextFriendId
      });
    }

    if (nextProps.fetchingUpdate !== this.props.fetchingUpdate) {
      this.setState({
        fetchingUpdate: nextProps.fetchingUpdate
      })

      if (this.state.fetchingUpdate) {
        console.log(nextProps.perviews);
        this.props.fetchFriendPerviews(Number(nextProps.match.params.friend_id))
      }
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
          userFriend = {this.props.perviews[0] !== undefined ? this.props.perviews[0].userDto : null}
        />

        <div className="friendperview__perviews">
          <NarrowPerview
            currentUserId = {this.props.currentUser.id}
            perviews = {this.props.perviews}
            bookmarkPerview = {this.props.bookmarkPerview}
            unbookmarkPerview = {this.props.unbookmarkPerview}
            likePerview = {this.props.likePerview}
            unlikePerview = {this.props.unlikePerview}
            history = {this.props.history}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(FriendPerviews);
