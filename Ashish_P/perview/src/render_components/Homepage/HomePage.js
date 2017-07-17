import React from 'react';
import { withRouter } from 'react-router-dom';
import WidePerview from "../PerviewsLayouts/WidePerview";

// class HomePage extends React.Component {
  // constructor (props) {
  //   super(props);
  //   console.log("HomePage", props);
  //   this.getPerviews = this.getPerviews.bind(this);
  // }
  const HomePage = (props) => {

  // getPerviews () {
  console.log(props);
    let perviews = [];
    for (let i = 0; i < 3; i++) {
      let product = {
        left: {
          img: './photo.jpg',
          title: 'Home Page',
          price: 'price',
          perviews: 'perviews'
        },
        right: {
          icon: 'url',
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
    // return perviews;
  // }
  // render() {

    return (
      <WidePerview
        perviews={perviews}
        />
    )
  // }
}

// perviews={this.getPerviews()}
export default withRouter(HomePage);
