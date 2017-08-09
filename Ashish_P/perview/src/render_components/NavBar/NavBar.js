import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";
import CreatePerviewModal from "../CreatePerviews/CreatePerviewModal";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "",
      canCreatePerviews: false
    }

    this.renderCreateButton = this.renderCreateButton.bind(this);
    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    this.updatePageTitle(this.props);
  }

  componentWillReceiveProps (nextProps) {
  }

  updatePageTitle(props) {
    switch (props.location.pathname) {
      case '/myperviews':
        this.setState({pageTitle: "My Perviews"})
        break;
      case '/favorites':
        this.setState({pageTitle: "Saved Perviews"})
        break;
      default:
        this.setState({pageTitle: "Check the Perviews of your friends!", canCreatePerviews: true})
        break;
    }
  }

  renderNavOption () {
    if (this.props.location.pathname === "/") {
      this.renderCreateButton();
    } else {

    }
  }

  renderCreateButton () {
    if (this.state.canCreatePerviews) {
      return (
        <CreatePerviewModal currentUser={this.props.currentUser} />
      )
    }
  }

  handleFilterChange() {

  }

  handleChange() {

  }

  renderFilterBar() {
    return (
      <div>
        <label className="navbar__filter">
          Filter by
          <select className="navbar__dropdown-filter" value={this.state.value} onChange={this.handleChange}>
            <option selected value="all">All Catagories</option>
            <option value="lime"></option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>

        <label className="navbar__sort">
          Sort by
          <select className="navbar__dropdown-sort" value="Sort by" onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
      </div>
    )
  }


  render() {
    return (
      <div className="navbar__container">
        <div className="flexrow navbar__box">
          <div className="navbar__title">
            {this.state.pageTitle}
          </div>
          { this.renderCreateButton() }
        </div>
      </div>

    )
  }
}

export default withRouter(NavBar);
