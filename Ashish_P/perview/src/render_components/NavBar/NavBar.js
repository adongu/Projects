import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";
import CreatePerviewModal from "../CreatePerviews/CreatePerviewModal";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "",
      canCreatePerviews: false,
      canCreateFilters: false
    }

    this.renderCreateButton = this.renderCreateButton.bind(this);
    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentWillMount() {
    this.updatePageTitle(this.props);
  }
  componentDidMount() {
    // this.updatePageTitle(this.props);
  }

  componentDidReceiveProps(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      this.updatePageTitle(this.props);
    }
  }

  updatePageTitle(props) {
    switch (props.location.pathname) {
      case '/':
        this.setState({pageTitle: "Check the Perviews of your friends!", canCreatePerviews: true, canCreateFilters: false})
        break;
      case '/myperviews':
        this.setState({pageTitle: "My Perviews", canCreatePerviews: false, canCreateFilters: true })
        break;
      case '/favorites':
        this.setState({pageTitle: "Saved Perviews", canCreatePerviews: false, canCreateFilters: true })
        break;
      default:
        this.setState({pageTitle: 'Settings', canCreateFilters: false})
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
        <CreatePerviewModal
          currentUser={this.props.currentUser}
          results={this.props.results}
          fetchUser={this.props.fetchUser}
          fetchResults={this.props.fetchResults}
          createPerview={this.props.createPerview}/>
      )
    }
  }

  handleFilterChange() {

  }

  handleChange() {

  }

  renderFilters() {
    console.log('allCategoryIds', this.props.allCategoryIds);
    if (this.state.canCreateFilters && this.props.allCategoryIds) {
      return (
        <div>
          <label className="navbar__filter">
            Filter by
            <select className="navbar__dropdown-filter" defaultValue={`${null}`} onChange={this.handleChange}>
              <option selected defaultValue="all">All Catagories</option>
              {this.props.allCategoryIds.map((category, id) => {
                  return (
                    <option key={`category_${id}`} onClick={this.props.handleFilterChange} value={id}>{category.displayName}</option>
                  )
                })}
              }
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
  }

  render() {
    return (
      <div className="navbar__container">
        <div className="flexrow navbar__box">
          <div className="navbar__title">
            {this.state.pageTitle}
          </div>
          { this.renderCreateButton() }
          { this.renderFilters() }
        </div>
      </div>

    )
  }
}

export default withRouter(NavBar);
