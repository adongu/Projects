import "../../styles/stylesheets/myperview.css"
import React from 'react';
import { withRouter } from 'react-router-dom';
// switch to PersonalPerview when the component is finish building
import NavBar from '../NavBar/NavBar'
import NarrowPerview from "../PerviewsLayouts/NarrowPerview";

class MyPerviews extends React.Component {
  constructor (props) {
    super(props);

    this.getPerviews = this.getPerviews.bind(this);
    this.validateRedirect = this.validateRedirect.bind(this);
  }

  componentWillMount () {
    // this.validateRedirect();
    this.props.fetchMyPerviews();
  }

  componentDidMount() {
    console.log('results', this.props.perviews);
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

  getPerviews () {
    let perviews = [];
    for (let i = 0; i < 6; i++) {
      let product = {
        top: {
          time: "Tuesday at 3:00 pm",
          img: 'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png',
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 145,
          perviews: 8
        },
        bottom: {
          rating: 3,
          tags: '#amazing #wow @almostlikeapet',
          perview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        }
      };
      perviews.push(product);
    }
    return perviews;
  }

  render () {
    return (
      <div>
        <NavBar
          currentUser={this.props.currentUser}
          results={this.props.results}
          fetchUser={this.props.fetchUser}
          fetchResults={this.props.fetchResults}
          createPerview={this.props.createPerview}
          categories={this.props.perviews.categories}
          clearErrors={this.props.clearErrors} />

        <div className="myperviews__container">
          <NarrowPerview
            perviews={this.props.perviews}
            />
        </div>
      </div>
    )
  }
}

export default withRouter(MyPerviews);
