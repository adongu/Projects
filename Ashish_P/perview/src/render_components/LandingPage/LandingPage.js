import "../../styles/stylesheets/homeperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderContainer from '../../containers/HeaderContainer';
import NavBarContainer from '../../containers/NavBarContainer.js';
import NarrowPerview from "../PerviewsLayouts/NarrowPerview";
import Footer from '../Footer/Footer.js'

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // fName: "",
      // lName: "",
      // id: "",
      // img: "",
      fetchingUpdate: false,
      requestLoading: false
    }
    // this.fetchFilteredPerviews = this.fetchFilteredPerviews.bind(this);
  }

  componentWillMount() {
    this.props.fetchLandingPerviews();
    this.props.fetchToken();
    this.props.fetchUser();
  }

  componentDidMount() {
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
        this.props.fetchLandingPerviews();
        // console.log(this.props.perview.comments.length)
      }
    }
  }

  fetchFilteredPerviews () {
    this.props.fetchLandingPerviews();
  }

  renderComponents() {
    if (this.state.requestloading) {
      return (
        <div>spinner</div>
      )
    } else {
      return (
        <NarrowPerview
          fetchingUpdate = {this.state.fetchingUpdate}
          // currentUserId = {this.props.currentUser.id}
          perviews = {this.props.landingPerviews}
          createComment = {this.props.showLoginModal}
          deleteComment = {this.props.showLoginModal}
          bookmarkPerview = {this.props.showLoginModal}
          unbookmarkPerview = {this.props.showLoginModal}
          likePerview = {this.props.showLoginModal}
          unlikePerview = {this.props.showLoginModal}
          toRenderUserProfile = {true}
          history = {this.props.history}
        />
      )
    }
  }

  render() {
    return (
      <div className="divwrapper-fullwidth">
        <HeaderContainer />

        <div className="homepage__container">

          <NavBarContainer
            // createPerview = {this.props.createPerview}
          />

          <div className="homepage__perviews">
            {this.renderComponents()}
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default withRouter(LandingPage);
