import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";

const NavBar = ({ filterPerviews, isFetching, currentUser, allCategoryIds, match, requestLoading }) => {

  const renderPageTitle = () => {
    switch (match.path) {
      case '/':
      case '/item/:item_id':
        return "Check the Perviews of your friends!";
        break;
      case '/myperviews':
        return "My Perviews";
        break;
      case '/favorites':
        return "Saved Perviews";
        break;
      case '/friend/:friend_id':
        return `Friend Perviews`;
        break;
      default:
        return 'Settings';
        break;
    }
  }

  const handleFilterChange = (e) => {
    console.log('hits filter change', e.currentTarget.value);
    filterPerviews(e.currentTarget.value);
    // filterPerviews(e.currentTarget.value);
  }

  const renderFilters = () => {
    if (allCategoryIds) {
      return (
        <div>
          <label className="navbar__filter">
            Filter by
            <select className="navbar__dropdown-filter" defaultValue={null} onChange={this.handleFilterChange}>
              <option className='filter__option' value={null}>All Catagories</option>
              {allCategoryIds.map((category, id) => {
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

  return (
    <div className="navbar__container">
      <div className="flexrow navbar__box">
        <div className="navbar__title">
          {renderPageTitle()}
        </div>
        {renderFilters()}
      </div>
    </div>
  )
}

export default withRouter(NavBar);
