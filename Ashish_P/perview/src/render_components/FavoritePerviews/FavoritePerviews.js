import "../../styles/stylesheets/favoriteperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../../containers/NavBarContainer.js';
import WidePerview from "../PerviewsLayouts/WidePerview";

class FavoritePerviews extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      requestLoading: false,
      categoryIds: []
    }

    this.fetchFilteredPerviews = this.fetchFilteredPerviews.bind(this);
  }

  componentWillMount () {
    this.props.fetchFavoritePerviews();
    this.props.fetchCategoryIds();

    // .then(() => this.setState({ categoryIds: this.props.categoryIds}))
  }

  componentDidMount() {
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.requestLoading !== this.props.requestLoading) {
      this.setState({
        requestLoading: nextProps.requestLoading
      })
    }
  }

  fetchFilteredPerviews(categoryId) {
    this.props.fetchFavoritePerviews(categoryId);
  }

  renderComponents() {
    if (this.state.requestLoading) {
      return (
        <div>spinner</div>
      )
    } else {
      return (
        <WidePerview
          perviews = {this.props.perviews}
        />
      )
    }
  }

  render() {
    return (
    <div className="favoriteperview__container">
      <NavBarContainer
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
