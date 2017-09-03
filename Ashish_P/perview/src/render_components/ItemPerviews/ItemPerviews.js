import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import WidePerview from "../PerviewsLayouts/WidePerview";
import ItemPerviewLayout from "../PerviewsLayouts/ItemPerviewLayout";

class ItemPerviews extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      requestLoading: false,
      categoryIds: []
    }

    this.filterPerviews = this.filterPerviews.bind(this);
  }

  componentWillMount () {
    this.props.fetchItemPerviews(Number(this.props.match.params.item_id));
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
    if (this.props.match.params.item_id !== nextProps.match.params.item_id) {
      this.props.fetchItemPerviews(Number(nextProps.match.params.item_id));
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
        <ItemPerviewLayout
          perviews={this.props.perviews}
          bookmarkPerview={this.props.bookmarkPerview}
          history={this.props.history}
        />
      )
    }
  }

  render() {
    return (
    <div>
      <NavBar
        allCategoryIds={this.props.allCategoryIds}
        clearErrors={this.props.clearErrors}
        createItem={this.props.createItem}
        createPerview={this.props.createPerview}
        currentUser={this.props.currentUser}
        results={this.props.results}
        filterPerviews={this.props.filterPerviews}
        fetchUser={this.props.fetchUser}
        fetchResults={this.props.fetchResults}
        selectedItem={this.props.selectedItem}
      />

      <div className="homepage__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(ItemPerviews);
