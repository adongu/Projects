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
    console.log('this.props.location.pathname', this.props.location.pathname);
  }

  componentDidReceiveProps (nextProps) {
    if (nextProps.requestLoading === false) {
      console.log('new props ', nextProps.allPerviews);
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

  // getPerviews () {
  //   let all = this.props.allPerviews;
  //   let perviews = [];
  //   for (let i = 0; i < 3; i++) {
  //     let product = {
  //       left: {
  //         img: 'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png',
  //         title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //         price: 145,
  //         perviews: 8
  //       },
  //       right: {
  //         icon: 'https://www.juicedb.com/img/user/temp-user-128.jpg',
  //         name: 'Sam White',
  //         time: "Tuesday at 3:00 pm",
  //         rating: 3,
  //         tags: '#amazing #wow @almostlikeapet',
  //         perview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //         comments: 9
  //       }
  //     };
  //     perviews.push(product);
  //   }
  //   return perviews;
  // }

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
