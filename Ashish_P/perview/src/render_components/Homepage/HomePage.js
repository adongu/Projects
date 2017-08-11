import "../../styles/stylesheets/homeperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import WidePerview from "../PerviewsLayouts/WidePerview";

class HomePage extends React.Component {
  constructor (props) {
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

  componentWillMount () {
    this.validateRedirect();
    this.props.fetchAllPerviews();
  }

  componentDidMount() {
  }

  componentDidReceiveProps (nextProps) {
    if (nextProps.requestLoading === false) {
      this.setState({
        requestLoading: false
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
        <WidePerview perviews={this.props.allPerviews}/>
      )
    }
  }

  render() {
    return (
    <div>
      <NavBar
        currentUser={this.props.currentUser}
        results={this.props.results}
        fetchUser={this.props.fetchUser}
        fetchResults={this.props.fetchResults}
        createPerview={this.props.createPerview}
        clearErrors={this.props.clearErrors} />

      <div className="homepage__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(HomePage);
