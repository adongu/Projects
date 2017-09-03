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

    this.filterPerviews = this.filterPerviews.bind(this);
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

  filterPerviews(categoryId) {
    return (e) => this.props.fetchResults(categoryId);
  }

  renderComponents() {
    if (this.state.requestLoading) {
      return (
        <div>spinner</div>
      )
    } else {
      return (
        <WidePerview perviews={this.props.perviews}/>
      )
    }
  }

  render() {
    return (
    <div className="favoriteperview__container">
      <NavBarContainer
        currentUser={this.props.currentUser}
        results={this.props.results}
        fetchUser={this.props.fetchUser}
        fetchResults={this.props.fetchResults}
        createPerview={this.props.createPerview}
        allCategoryIds={this.props.allCategoryIds}
        filterPerviews={this.props.filterPerviews}
        clearErrors={this.props.clearErrors}  />

      <div className="favoriteperview__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(FavoritePerviews);
