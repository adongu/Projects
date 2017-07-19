import React from 'react';
import { withRouter } from 'react-router-dom';
import WidePerview from "../PerviewsLayouts/WidePerview";
// switch to PersonalPerview when the component is finish building
import PersonalPerview from "../PerviewsLayouts/PersonalPerview";

class MyPerviews extends React.Component {
  constructor (props) {
    super(props);
    this.getPerviews = this.getPerviews.bind(this);
  }

  getPerviews () {
    let perviews = [];
    for (let i = 0; i < 1; i++) {
      let product = {
        left: {
          img: 'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png',
          title: 'MyPerviews Page',
          price: 'price',
          perviews: 'perviews'
        },
        right: {
          icon: 'https://www.juicedb.com/img/user/temp-user-128.jpg',
          name: 'name',
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

  render () {
    return (
      <WidePerview
        perviews={this.getPerviews()}
        />
    )
  }
}

export default withRouter(MyPerviews);
