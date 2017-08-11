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
      isFetching: true
    }
    this.getPerviews = this.getPerviews.bind(this);
    this.validateRedirect = this.validateRedirect.bind(this);
  }

  componentWillMount () {
    this.validateRedirect();
  }

  componentDidMount() {
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentUser) {
      let user = nextProps.currentUser;
      this.setState({
        fName: user.firstName,
        img:  user.facebookProfilePictureUrl,
        isFetching: false
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
    for (let i = 0; i < 3; i++) {
      let product = {
        left: {
          img: 'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png',
          title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          price: 145,
          perviews: 8
        },
        right: {
          icon: 'https://www.juicedb.com/img/user/temp-user-128.jpg',
          name: 'Sam White',
          time: "Tuesday at 3:00 pm",
          rating: 3,
          tags: '#amazing #wow @almostlikeapet',
          perview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          comments: 9
        }
      };
      perviews.push(product);
    }
    return perviews;
  }

  renderComponents() {
    if (this.state.isFetching) {
      return (
        <div>spinner</div>
      )
    } else {
      return (
        <WidePerview perviews={this.getPerviews()}/>
      )
    }
  }

  render() {
    return (
    <div>
      <NavBar
        createPerview={this.props.createPerview}
        currentUser={this.props.currentUser}
        fetchUser={this.props.fetchUser}
        clearErrors={this.props.clearErrors} />

      <div className="homepage__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(HomePage);
