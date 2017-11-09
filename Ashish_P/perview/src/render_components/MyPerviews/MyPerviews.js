import "../../styles/stylesheets/myperview.css"
import React from 'react';
import { withRouter } from 'react-router-dom';
// switch to PersonalPerview when the component is finish building
import NavBarContainer from '../../containers/NavBarContainer.js';
import NarrowPerviewContainer from '../../containers/NarrowPerviewContainer';

class MyPerviews extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      requestLoading: false,
      fetchingUpdate: false,
      categoryId: "",
      categories: [],
      showConfirmation: false,
      toShowUserDashBoard: true,
    }

    this.fetchFilteredPerviews = this.fetchFilteredPerviews.bind(this);
  }

  componentWillMount () {
    this.props.fetchMyPerviews();

    this.setState({
      categories: this.props.categories
    });
  }

  componentDidMount() {
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
        this.props.fetchMyPerviews(this.state.categoryId);
      }
    }
  }

  fetchFilteredPerviews(categoryId) {
    this.setState({ categoryId: categoryId });

    this.props.fetchMyPerviews(categoryId);
  }

  toggleDeleteConfirmation(e) {
    e.preventDefault();
    this.setState({ })
  }

  render () {
    return (
      <div className="myperview__container">
        <NavBarContainer
          toShowUserDashBoard={this.state.toShowUserDashBoard}
          currentUser = {this.props.currentUser}
          currentUsersFriends = {this.props.currentUser.friends}
          categories = {this.state.categories }
          filterPerviews = {this.fetchFilteredPerviews}
          history = {this.props.history}
        />

        <div className="myperview__perviews">
          <NarrowPerviewContainer
            currentUserId = {this.props.currentUser.id}
            perviews = {this.props.perviews}
            editPerview = {this.props.editPerview}
            deletePerview = {this.props.deletePerview}
            bookmarkPerview = {this.props.bookmarkPerview}
            unbookmarkPerview = {this.props.unbookmarkPerview}
            likePerview = {this.props.likePerview}
            unlikePerview = {this.props.unlikePerview}
            toggleConfirmation = {this.toggleConfirmation}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(MyPerviews);
