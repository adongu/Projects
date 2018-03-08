import React, { Component, PropTypes } from 'react';

class HamburgerMenu extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  render() {
    return (
      <div>
        <i className="fa fa-bars fa-2x"></i>
      </div>
    )
  }
}

export default HamburgerMenu;
