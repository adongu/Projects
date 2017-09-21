import "../../styles/stylesheets/FriendPerviews/friendperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../../containers/NavBarContainer';
import NarrowPerview from "../PerviewsLayouts/NarrowPerview";

class FriendPerviews extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      fetchingUpdate: false,
      requestLoading: false,
      friendId: null,
      categoryId: "",
      categories: []
    }

    this.fetchFilteredPerviews = this.fetchFilteredPerviews.bind(this);
  }

  componentWillMount () {
    this.props.fetchFriendPerviews(Number(this.props.match.params.friend_id))
    .then(() => {
      this.setState({
        // categories: this.props.categories,
        friendId: Number(this.props.match.params.friend_id)
      });
    });
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
        this.props.fetchFriendPerviews(Number(nextProps.match.params.friend_id),  this.state.categoryId)
        // .then(() => {
        //   categories: nextProps.categories
        // })
      }
    }
  }

  fetchFilteredPerviews(catetoryId) {
    this.setState({ categoryId: catetoryId });

    this.props.fetchFriendPerviews(this.state.friendId, catetoryId);
  }

  render () {
    return (
      <div className="friendperview__container">
        <NavBarContainer
          categories = {this.state.categories}
          userFriend = {this.props.userFriend}
          filterPerviews = {this.fetchFilteredPerviews}
        />

        <div className="friendperview__perviews">
          <NarrowPerview
            currentUserId =     {this.props.currentUser.id}
            perviews =          {this.props.perviews}
            bookmarkPerview =   {this.props.bookmarkPerview}
            unbookmarkPerview = {this.props.unbookmarkPerview}
            likePerview =       {this.props.likePerview}
            unlikePerview =     {this.props.unlikePerview}
            history =           {this.props.history}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(FriendPerviews);
