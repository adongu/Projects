import "../../styles/stylesheets/myperview.css"
import React from 'react';
import { withRouter } from 'react-router-dom';
// switch to PersonalPerview when the component is finish building
import NavBar from '../NavBar/NavBar'
import NarrowPerview from "../PerviewsLayouts/NarrowPerview";

class MyPerviews extends React.Component {
  constructor (props) {
    super(props);

    this.validateRedirect = this.validateRedirect.bind(this);
  }

  componentWillMount () {
    // this.validateRedirect();
    this.props.fetchMyPerviews();
    this.props.fetchCategoryIds();
  }

  componentDidMount() {
    console.log('results', this.props.perviews);
  }

  componentDidReceiveProps (nextProps) {
    if (nextProps.requestLoading === false) {
      this.setState({
        requestLoading: false
      })
    }
  }

  validateRedirect() {
    this.props.fetchUser()
      .then(() => { console.log("after fetchUser", this.props);})
      .catch(() => this.props.history.replace({ pathname: '/signin' }));
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
          filterPerviews={this.props.filterPerviews}
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
