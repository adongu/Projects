import "../../styles/stylesheets/myperview.css"
import React from 'react';
import { withRouter } from 'react-router-dom';
// switch to PersonalPerview when the component is finish building
import NavBarContainer from '../../containers/NavBarContainer.js';
import NarrowPerview from "../PerviewsLayouts/NarrowPerview";

class MyPerviews extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      requestLoading: false
    }

    this.fetchFilteredPerviews = this.fetchFilteredPerviews.bind(this);
  }

  componentWillMount () {
    this.props.fetchMyPerviews();
    this.props.fetchCategoryIds();

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
    this.props.fetchMyPerviews(categoryId);
  }

  render () {
    return (
      <div className="myperview__container">
        <NavBarContainer
          filterPerviews = {this.fetchFilteredPerviews}
        />

        <div className="myperview__perviews">
          <NarrowPerview
            perviews = {this.props.perviews}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(MyPerviews);
