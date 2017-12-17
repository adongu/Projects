import "../../styles/stylesheets/homeperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../../containers/NavBarContainer';
import NarrowPerviewContainer from '../../containers/NarrowPerviewContainer.js';

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

  componentDidMount() {
    if (!(Object.keys(this.props.allPerviews).length > 0)) {
      this.props.fetchAllPerviews()
    }
  }

  componentDidUpdate(prevProps) {
     if (this.props.history.location !== prevProps.history.location) {
       window.scrollTo(0, 0)
     }
   }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requestLoading !== this.props.requestLoading) {
      this.setState({
        requestLoading: nextProps.requestLoading
      })
    }

    if (nextProps.fetchingUpdate !== this.props.fetchingUpdate) {
      this.setState({
        fetchingUpdate: nextProps.fetchingUpdate
      })
      if (this.state.fetchingUpdate) {
        this.props.fetchAllPerviews();
      }
    }

    if (nextProps.previousPath !== this.props.previousPath) {
      nextProps.history.replace({ pathname: nextProps.previousPath.replace('=/', '') });
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
        <NarrowPerviewContainer
          // fetchingUpdate = {this.state.fetchingUpdate}
          currentUserId = {this.props.currentUser.id}
          perviews = {this.props.allPerviews}
          bookmarkPerview = {this.props.bookmarkPerview}
          unbookmarkPerview = {this.props.unbookmarkPerview}
          likePerview = {this.props.likePerview}
          unlikePerview = {this.props.unlikePerview}
          toRenderUserProfile = {true}
          history = {this.props.history}
        />
      )
    }
  }

  render() {
    return (
    <div className="homepage__container">
      <NavBarContainer
        createPerview = {this.props.createPerview}
      />

      <div className="homepage__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(HomePage);
