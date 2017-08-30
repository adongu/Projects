import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import WidePerview from "../PerviewsLayouts/WidePerview";

class ItemPerviews extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      requestLoading: false,
      categoryIds: []
    }

    this.validateRedirect = this.validateRedirect.bind(this);
    this.filterPerviews = this.filterPerviews.bind(this);
  }

  componentWillMount () {
    this.validateRedirect();
    this.props.fetchItemPerviews(Number(this.props.match.params.item_id));
    this.props.fetchCategoryIds()
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

  validateRedirect() {
    this.props.fetchUser()
      // .then(() => { console.log("after fetchUser", this.props);})
      .catch(() => this.props.history.replace({ pathname: '/signin' }));
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
        <WidePerview
          perviews={this.props.perviews}
          bookmarkPerview={this.props.bookmarkPerview}
          match={this.props.history}/>
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
        selectedItem={this.props.selectedItem}/>

      <div className="homepage__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(ItemPerviews);
