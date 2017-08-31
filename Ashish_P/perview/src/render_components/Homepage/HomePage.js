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
  }

  componentWillMount() {
    // this.validateRedirect();

  }

  componentDidMount() {
    this.props.fetchAllPerviews()
    .then((response) => {
      // console.log('no error', response);
    });
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
      console.log('render wideperview');
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
    console.log('render homepage');
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
