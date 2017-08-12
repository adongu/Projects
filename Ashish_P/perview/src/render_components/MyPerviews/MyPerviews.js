import "../../styles/stylesheets/myperview.css"
import React from 'react';
import { withRouter } from 'react-router-dom';
// switch to PersonalPerview when the component is finish building
import NavBar from '../NavBar/NavBar'
import NarrowPerview from "../PerviewsLayouts/NarrowPerview";

class MyPerviews extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      requestLoading: false
    }

    this.validateRedirect = this.validateRedirect.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentWillMount () {
    // this.validateRedirect();
    this.props.fetchMyPerviews();
    this.props.fetchCategoryIds();
  }

  componentDidMount() {
  }

  componentDidReceiveProps (nextProps) {
    if (nextProps.requestLoading !== this.props.requestLoading) {
      this.setState({
        requestLoading: nextProps.requestLoading
      })
    }
  }

  validateRedirect() {
    this.props.fetchUser()
      .then(() => { console.log("after fetchUser", this.props);})
      .catch(() => this.props.history.replace({ pathname: '/signin' }));
  }

  handleFilterChange(e) {
    this.props.fetchMyPerviews(e.target.value);
  }

  handleSortChange(event) {

  }

  render () {
    return (
      <div>
        <NavBar
          currentUser={this.props.currentUser}
          categories={this.props.perviews.categories}
          results={this.props.results}
          fetchUser={this.props.fetchUser}
          fetchResults={this.props.fetchResults}
          createPerview={this.props.createPerview}
          allCategoryIds={this.props.allCategoryIds}
          handleFilterChange={this.handleFilterChange}
          handleSortChange={this.handleSortChange}
          clearErrors={this.props.clearErrors} />

        <div className="myperviews__container">
          <NarrowPerview
            perviews={this.props.perviews}
            />
        </div>
      </div>
    )
  }
}

export default withRouter(MyPerviews);
