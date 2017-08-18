import "../../styles/stylesheets/homeperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
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
    // this.getPerviews = this.getPerviews.bind(this);
    this.validateRedirect = this.validateRedirect.bind(this);
  }

  componentWillMount() {
    this.validateRedirect();
    this.props.fetchAllPerviews();
  }

  componentDidMount() {
  }

  componentDidReceiveProps(nextProps) {
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

  renderComponents() {
    if (this.state.requestLoading) {
      return (
        <div>spinner</div>
      )
    } else {
      return (
        <WidePerview
          perviews={this.props.allPerviews}
          bookmarkPerview={this.props.bookmarkPerview}
          likePerview={this.props.likePerview}
        />
      )
    }
  }

  render() {
    return (
    <div>
      <NavBar
        createItem={this.props.createItem}
        createPerview={this.props.createPerview}
        clearErrors={this.props.clearErrors}
        currentUser={this.props.currentUser}
        fetchUser={this.props.fetchUser}
        fetchResults={this.props.fetchResults}
        selectedItem={this.props.selectedItem}
        results={this.props.results}
        />

      <div className="homepage__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(HomePage);
