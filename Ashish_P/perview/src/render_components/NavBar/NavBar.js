import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";

const NavBar = ({ filterPerviews, isFetching, currentUser, userFriend, categories, match, requestLoading }) => {

  const pageSettings = {
    "/" : {
      "title": "", "hasFilters": false, "hasCreateSolicit": true
    },
    "/myperviews": {
      "title": "", "hasFilters": true
    },
    "/favorites": {
      "title": "", "hasFilters": true
    },
    "/friend/:friend_id": {
      "title": "", "hasFilters": true
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
  }

  const renderCreateSolicit = () => {
    if (match && match.path && pageSettings[match.path].hasCreateSolicit) {
      return (
        <form action={(e) => (e) => e.preventDefault()}>
          <textarea placeholder="What kind of items do you want your friends to perview? #chrismas presents #babyshower #wedding #videogames"/>
          <button>Submit</button>
        </form>
      )
    }
  }

  const renderUserHero = () => {
    if (currentUser || userFriend) {
      let user;

      if (currentUser) {
        user = currentUser;
      } else if(userFriend) {
        user = userFriend;
      };

      if (user.facebookProfilePictureUrl) {
        return (
          <div className="navbar__dashboard">
            <div className="navbar__dashboard-photo">
              <img
                className="navbar__dashboard-img" src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")}
                alt="User"
              />
            </div>

            <div className="navbar__dashboard-info">
              <div className="navbar__dashboard-name">
                {user.fullName}
              </div>
              <div className="navbar__dashboard-stats">
                <span className="navbar__dashboard-numperviews">
                  {user.numPerviews}
                  <span className="navbar__dashboard-text">
                    perviews
                  </span>
                </span>
                <span className="navbar__dashboard-numfriends">
                  {user.numFriends}
                  <span className="navbar__dashboard-text">
                    friends
                  </span>
                </span>
                <span className="navbar__dashboard-numfirsts">
                  {user.numFirsts}
                  <span className="navbar__dashboard-text">
                    firsts
                  </span>
                </span>
              </div>
            </div>

          </div>
        )
      }
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
                <option default={true} className='navbar__filteroption' value={""}>
                  All Categories
                </option>
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
          {renderCreateSolicit()}
          {renderUserHero()}
          {(match && pageSettings[match.path]) ? pageSettings[match.path]["title"] : ""}
        </div>
        {renderFilters()}
      </div>
    </div>
  )
}

export default withRouter(NavBar);
