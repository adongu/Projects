import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";

const NavBar = ({ filterPerviews, isFetching, currentUser, userFriend, categories, match, requestLoading }) => {

  const pageSettings = {
    "/" : {
      "title": "", "hasFilters": true
    },
    "/myperviews": {
      "title": "", "hasFilters": true
    },
    "/favorites": {
      "title": "", "hasFilters": true
    },
    "/friend/:friend_id": {
      "title": "Perviews", "hasFilters": true
    },
    "/settings": {
      "title": "Settings", "hasFilters": false
    },
    "/item/:item_id": {
      "title": "", "hasFilters": false
    }
  }

  const handleFilterChange = (e) => {
    filterPerviews(e.currentTarget.value);
    // filterPerviews(e.currentTarget.value);
  }

  const renderUserFriend = () => {
    if (userFriend) {
      return (
        <div className="flexrow navbar__userbox">
          <span className="navbar__userimgbox">
            <img className="navbar__userimg"
              src={userFriend.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"
            />
          </span>
          <span className="navbar__username">{userFriend.fullNamePossession}</span>
        </div>
      )
    }
  }

  const renderFilters = () => {
    if (categories && match && match.path && pageSettings[match.path].hasFilters) {
      return (
        <div>
          <label className="navbar__filterbox">
            <span className="navbar__filter-title">
              Filter by
            </span>
              <select className="navbar__dropdown-filter" defaultValue={null} onChange={handleFilterChange}>
                <option default={true} className='navbar__filteroption' value={""}>All Categories</option>
                  {categories.map((category, id) => {
                    return (
                      <option
                        className='navbar__filteroption'
                        key={`category_${category.id}`}
                        value={category.id}>
                        {category.displayName}
                      </option>
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
        <div className="flexrow navbar__title">
          {renderUserFriend()}
          {(match && pageSettings[match.path]) ? pageSettings[match.path]["title"] : ""}
        </div>
        {renderFilters()}
      </div>
    </div>
  )
}

export default withRouter(NavBar);
