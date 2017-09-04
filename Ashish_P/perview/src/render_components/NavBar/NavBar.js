import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";

const NavBar = ({ filterPerviews, isFetching, currentUser, allCategoryIds, match, requestLoading }) => {

  const pageSettings = {
    "/" : {
      "title": "Check the Perviews of your friends!", "hasFilters": true
    },
    "/myperviews": {
      "title": "My Perviews", "hasFilters": true
    },
    "/favorites": {
      "title": "Saved Perviews", "hasFilters": true
    },
    "/friend/:friend_id": {
      "title": `${currentUser ? currentUser.firstName : ""} Perviews`, "hasFilters": true
    },
    "settings": {
      "title": "Settings", "hasFilters": false
    },
    "/item/:item_id": {
      "title": "Check the Perviews of your friends!", "hasFilters": false
    }
  }

  const handleFilterChange = (e) => {
    filterPerviews(e.currentTarget.value);
    // filterPerviews(e.currentTarget.value);
  }

  const renderFilters = () => {
    console.log(allCategoryIds);
    if (allCategoryIds && match && match.path && pageSettings[match.path].hasFilters) {
      return (
        <div>
          <label className="navbar__filter">
            Filter by
            <select className="navbar__dropdown-filter" defaultValue={null} onChange={handleFilterChange}>
              <option className='filter__option' value={""}>All Catagories</option>
                {allCategoryIds.map((category, id) => {
                  return (
                    <option className='filter__option' key={`category_${category.id}`}  value={category.id}>{category.displayName}</option>
                  )
                })}
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
          {(match && pageSettings[match.path]) ? pageSettings[match.path]["title"] : ""}
        </div>
        {renderFilters()}
      </div>
    </div>
  )
}

export default withRouter(NavBar);
