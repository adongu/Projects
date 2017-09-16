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
      requestLoading: false,
      fetchingUpdate: false,
      categoryId: "",
      categories: []
    }

    this.fetchFilteredPerviews = this.fetchFilteredPerviews.bind(this);
  }

  componentWillMount () {
    this.props.fetchMyPerviews()
    .then(() => {
      this.setState({ categories: this.props.categories });
    });
  }

  componentDidMount() {
  }

  componentWillReceiveProps (nextProps) {
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
        this.props.fetchMyPerviews(this.state.categoryId);
      }
    }
  }

  fetchFilteredPerviews(categoryId) {
    this.setState({ categoryId: categoryId });

    this.props.fetchMyPerviews(categoryId);
  }

  render () {
    return (
      <div className="myperview__container">
        <NavBarContainer
          categories = {this.state.categories }
          filterPerviews = {this.fetchFilteredPerviews}
        />

        <div className="myperview__perviews">
          <NarrowPerview
            currentUserId = {this.props.currentUser.id}
            perviews = {this.props.perviews}
            editPerview = {this.props.editPerview}
            deletePerview = {this.props.deletePerview}
            bookmarkPerview = {this.props.bookmarkPerview}
            unbookmarkPerview = {this.props.unbookmarkPerview}
            likePerview = {this.props.likePerview}
            unlikePerview = {this.props.unlikePerview}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(MyPerviews);
