import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategoryIds: [],
      pageTitle: "",
      canCreateFilters: true
    }

    this.updatePageTitle = this.updatePageTitle.bind(this);
  }

  componentWillMount() {
    this.updatePageTitle(this.props);
    this.props.fetchCategoryIds()
    .then(() => {
      this.setState({ allCategoryIds: this.props.allCategoryIds })
    })
  }

  componentDidMount() {
  }

  componentDidReceiveProps (newProps) {
  }

  updatePageTitle(props) {
    switch (props.match.path) {
      case '/':
      case '/item/:item_id':
        this.setState({pageTitle: "Check the Perviews of your friends!" })
        break;
      case '/myperviews':
        this.setState({pageTitle: "My Perviews" })
        break;
      case '/favorites':
        this.setState({pageTitle: "Saved Perviews" })
        break;
      case '/friend/:friend_id':
        this.setState({pageTitle: `Friend Perviews` })
        break;
      default:
        this.setState({pageTitle: 'Settings', canCreateFilters: false})
        break;
    }
  }

  handleFilterChange (e) {
    this.props.filterPerviews(e.currentTarget.value);
  }

  renderFilters() {
    if (this.state.canCreateFilters && this.state.allCategoryIds) {
      return (
        <div>
          <label className="navbar__filter">
            Filter by
            <select className="navbar__dropdown-filter" defaultValue={null} onChange={this.props.handleFilterChange}>
              <option className='filter__option' value={null}>All Catagories</option>
              {this.state.allCategoryIds.map((category, id) => {
                  return (
                    <option className='filter__option' key={`category_${category.id}`}  value={category.id}>{category.displayName}</option>
                  )
                })}
              }
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
