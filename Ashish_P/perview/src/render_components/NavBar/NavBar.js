import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "",
      canCreateFilters: false
    }

    this.updatePageTitle = this.updatePageTitle.bind(this);
  }

  componentWillMount() {
    this.updatePageTitle(this.props);
  }
  componentDidMount() {
    // this.updatePageTitle(this.props);
  }

  // componentDidReceiveProps(prevProps, prevState) {
  //   if (prevProps.location !== this.props.location) {
  //     this.updatePageTitle(this.props);
  //   }
  // }

  updatePageTitle(props) {
    switch (props.match.path) {
      case '/':
      case '/item/:item_id':
        this.setState({pageTitle: "Check the Perviews of your friends!", canCreateFilters: false})
        break;
      case '/myperviews':
        this.setState({pageTitle: "My Perviews", canCreateFilters: true })
        break;
      case '/favorites':
        this.setState({pageTitle: "Saved Perviews", canCreateFilters: true })
        break;
      case '/friend/:friend_id':
        this.setState({pageTitle: `Friend Perviews`, canCreateFilters: true })
        break;
      default:
        this.setState({pageTitle: 'Settings', canCreateFilters: false})
        break;
    }
  }

  renderNavOption () {
    if (this.props.location.pathname === "/") {
    } else {
    }
  }

  renderFilters() {
    if (this.state.canCreateFilters && this.props.allCategoryIds) {
      return (
        <div>
          <label className="navbar__filter">
            Filter by
            <select className="navbar__dropdown-filter" defaultValue={null} onChange={this.props.handleFilterChange}>
              <option className='filter__option' value={null}>All Catagories</option>
              {this.props.allCategoryIds.map((category, id) => {
                  return (
                    <option className='filter__option' key={`category_${category.id}`}  value={category.id}>{category.displayName}</option>
                  )
                })}
              }
            </select>
          </label>

          <label className="navbar__sort">
            Sort by
            <select className="navbar__dropdown-sort" defaultValue={null} onChange={this.handleSortChange}>
              <option key={null} className='sort__option'  value={null}>None</option>
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
          { this.renderFilters() }
        </div>
      </div>

    )
  }
}

export default withRouter(NavBar);
