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
    console.log('itemid', Number(nextProps.match.params.item_id));
    if ('itemid', this.props.match.params.item_id !== nextProps.match.params.item_id) {
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
        <WidePerview perviews={this.props.perviews}/>
      )
    }
  }

  render() {
    return (
    <div>
      <NavBar
        currentUser={this.props.currentUser}
        results={this.props.results}
        fetchUser={this.props.fetchUser}
        fetchResults={this.props.fetchResults}
        createPerview={this.props.createPerview}
        allCategoryIds={this.props.allCategoryIds}
        filterPerviews={this.props.filterPerviews}
        clearErrors={this.props.clearErrors}  />

      <div className="homepage__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(ItemPerviews);
