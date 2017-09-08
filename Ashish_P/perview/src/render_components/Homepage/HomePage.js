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
      fetchingUpdate: false,
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

    if (nextProps.fetchingUpdate !== this.props.fetchingUpdate) {
      console.log('hits');
      this.setState({
        fetchingUpdate: nextProps.fetchingUpdate
      })
      if (this.state.fetchingUpdate) {
        this.props.fetchAllPerviews();
      }
    }
  }

  fetchFilteredPerviews (categoryId) {
    this.props.fetchAllPerviews(categoryId);
  }

  renderComponents() {
    if (this.state.requestloading) {
      return (
        <div>spinner</div>
      )
    } else {
      return (
        <WidePerview
          fetchingUpdate = {this.state.fetchingUpdate}
          currentUserId = {this.props.currentUser.id}
          perviews = {this.props.allPerviews}
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
    <div className="homepage__container">
      <NavBarContainer />

      <div className="homepage__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(HomePage);
