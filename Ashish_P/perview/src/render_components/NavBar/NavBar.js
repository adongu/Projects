import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/navbar.css";
import { Popover, OverlayTrigger } from 'react-bootstrap';
import CreateSolicitForm from "./CreateSolicitForm.js";


const NavBar = ({ filterPerviews, isFetching, currentUser, currentUsersFriends, userFriend, history, categories, match, requestLoading }) => {

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

  // This method was copied from PerviewCard since it already does this.
  // I don't know how/where to put this method so both classes can access
  // globally. ABP. 10-09-2017
  const handleFriendClick = (friendId) => {
    return (e) => {
      if (currentUser.id === friendId) {
        history.replace({ pathname: `/myperviews` });
      } else {
        history.replace({ pathname: `/friend/${friendId}` });
      }
    }
  }

  const popoverClickFriendClose = currentUsersFriends ? (
    <Popover
      id="popover-trigger-click-root-close"
      title="Friends"
      className="perviewcard__popover"
    >
      <div>
        {currentUsersFriends.map((friend) => {
          return (
            <div key={`myperviews-${currentUser.id}-${friend.id}`} className="flexrow perviewcard__popover-user">
              <div className="perviewcard__popover-user-icon">
                <img
                  onClick={handleFriendClick(friend.id)}
                  className="perviewcard__popover-user-img" src={friend.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
              </div>
              <a onClick={handleFriendClick(friend.id)} className="perviewcard__popover-username">
                {friend.firstName}
              </a>
            </div>
          )
        })}

        <div>
        </div>
      </div>
    </Popover>
  ) : (
    <div></div>
  );

  const renderNumFriends = () => {
    if (currentUser) {
      return (
        <div className="perviewcard__numlikers-box">
        <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={popoverClickFriendClose} className="perviewcard__popovertrigger">
          <span className="navbar__dashboard-numfriends">
            {currentUser.numFriends}
            <span className="navbar__dashboard-text">
              friends
            </span>
          </span>
        </OverlayTrigger>
        </div>
      )
    } else if (userFriend) {
      return (
        <span className="navbar__dashboard-numfriends">
          {userFriend.numFriends}
          <span className="navbar__dashboard-text">
            friends
          </span>
        </span>
      )
    }
  }

  const renderCreateSolicit = () => {
    if (match && pageSettings[match.path].hasCreateSolicit) {
      return (
        <CreateSolicitForm

        />
      )
    }
  }

  const renderUserHero = () => {
    if (currentUser || userFriend) {
      let user;

      if (currentUser) {
        user = currentUser;
      } else if (userFriend) {
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

                {renderNumFriends()}

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
