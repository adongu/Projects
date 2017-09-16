import "../../styles/stylesheets/favoriteperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../../containers/NavBarContainer.js';
import NarrowPerview from "../PerviewsLayouts/NarrowPerview";

class FavoritePerviews extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      requestLoading: false,
      fetchingUpdate: false,
      categories: []
    }

    this.fetchFilteredPerviews = this.fetchFilteredPerviews.bind(this);
  }

  componentWillMount () {
    this.props.fetchFavoritePerviews()
    .then(() => {
      this.setState({ categories: this.props.categories });
    })
  }

  componentDidMount() {
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.requestLoading !== this.props.requestLoading) {
      this.setState({
        requestLoading: nextProps.requestLoading,
        categories: this.props.categories
      })
    }

    if (nextProps.fetchingUpdate !== this.props.fetchingUpdate) {
      this.setState({
        fetchingUpdate: nextProps.fetchingUpdate,
        categories: this.props.categories
      })
      if (this.state.fetchingUpdate) {
        this.props.fetchFavoritePerviews(this.state.categoryId);
      }
    }
  }

  fetchFilteredPerviews(categoryId) {
    this.setState({ categoryId: categoryId })

    this.props.fetchFavoritePerviews(categoryId);
  }

  renderComponents() {
    if (false) {
      return (
        <div>spinner</div>
      )
    } else {
      return (
        <NarrowPerview
          currentUserId = {this.props.currentUser.id}
          perviews = {this.props.perviews}
          bookmarkPerview = {this.props.bookmarkPerview}
          unbookmarkPerview = {this.props.unbookmarkPerview}
          likePerview = {this.props.likePerview}
          unlikePerview = {this.props.unlikePerview}
        />
      )
    }
  }

  render() {
    return (
      <div className="favoriteperview__container">
        <NavBarContainer
          categories = {this.state.categories}
          filterPerviews = {this.fetchFilteredPerviews}
        />

        <div className="favoriteperview__perviews">
          {this.renderComponents()}
        </div>
      </div>
    )
  }
}

export default withRouter(FavoritePerviews);
