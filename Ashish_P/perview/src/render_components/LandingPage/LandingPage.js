import "../../styles/stylesheets/homeperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderContainer from '../../containers/HeaderContainer';
import NavBarContainer from '../../containers/NavBarContainer.js';
import NarrowPerview from "../PerviewsLayouts/NarrowPerview";
import Footer from '../Footer/Footer.js'

class HomePage extends React.Component {
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
    this.props.fetchToken();
    this.props.fetchUser();

    this.props.fetchLandingPerviews()

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
          createComment = {this.props.createComment}
          deleteComment = {this.props.deleteComment}
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
    console.log('render landign page', this.props)
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

export default withRouter(HomePage);
