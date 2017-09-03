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
    // this.getPerviews = this.getPerviews.bind(this);
  }

  componentWillMount() {
    this.props.fetchAllPerviews()
    .then((response) => {
    });
    // this.validateRedirect();

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
    <div className="homepage__container">
      <NavBarContainer
        filterPerviews={this.props.fetchResults}
      />

      <div className="homepage__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(HomePage);
