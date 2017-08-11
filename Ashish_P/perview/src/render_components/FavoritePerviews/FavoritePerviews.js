import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import WidePerview from "../PerviewsLayouts/WidePerview";

class FavoritePerviews extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      requestLoading: false
    }

    this.validateRedirect = this.validateRedirect.bind(this);
  }

  componentWillMount () {
    this.validateRedirect();
    this.props.fetchFavoritePerviews();
  }

  componentDidMount() {
    console.log('this.props.location.pathname', this.props.location.pathname);
  }

  componentDidReceiveProps (nextProps) {
    if (nextProps.requestLoading === false) {
      console.log('new props ', nextProps.favoritePerviews);
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
        fetchPerviews={this.props.fetchFavoritePerviews}
        createPerview={this.props.createPerview}
        clearErrors={this.props.clearErrors} />

      <div className="homepage__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(FavoritePerviews);
