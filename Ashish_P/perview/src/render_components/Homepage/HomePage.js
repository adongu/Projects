import "../../styles/stylesheets/homeperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../../containers/NavBarContainer.js';
import WidePerview from "../PerviewsLayouts/WidePerview";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      id: "",
      img: "",
      requestLoading: false
    }
    this.fetchFilteredPerviews = this.fetchFilteredPerviews.bind(this);
  }

  componentWillMount() {
    this.props.fetchAllPerviews()
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requestLoading !== this.props.requestLoading) {
      this.setState({
        requestLoading: nextProps.requestLoading
      })
    }
  }

  fetchFilteredPerviews (categoryId) {
    this.props.fetchAllPerviews(categoryId);
  }

  renderComponents() {
    if (this.state.requestLoading) {
      return (
        <div>spinner</div>
      )
    } else {
      return (
        <WidePerview
          currentUserId = {this.props.currentUser.id}
          perviews = {this.props.allPerviews}
          bookmarkPerview = {this.props.bookmarkPerview}
          likePerview = {this.props.likePerview}
        />
      )
    }
  }

  render() {
    return (
    <div className="homepage__container">
      <NavBarContainer
        filterPerviews = {this.fetchFilteredPerviews}
        categories = {this.props.categories}
      />

      <div className="homepage__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(HomePage);
