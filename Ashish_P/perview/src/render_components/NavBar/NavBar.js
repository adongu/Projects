import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../styles/stylesheets/NavBar/navbar.css";
import { Popover, OverlayTrigger } from 'react-bootstrap';
import CreateSolicitForm from "./CreateSolicitForm.js";
import * as util from '../../actions/util_actions.js';
import FriendHero from './FriendHero';

const NavBar = ({ createPerview, filterPerviews, isFetching, currentUser, currentUsersFriends, userFriend, history, categories, match, toShowUserDashBoard, requestLoading, solicit }) => {

  const pageSettings = {
    "/home" : {
      "title": "Recent Perviews", "hasFilters": false, "hasCreateSolicit": false
    },
    "/" : {
      "title": "Perviews in your network", "hasFilters": false, "hasCreateSolicit": true
    },
    "/myperviews": {
      "title": "", "hasFilters": true, "userDashBoardType": 'self'
    },
    "/favorites": {
      "title": "", "hasFilters": true
    },
    "/friend/:friend_id": {
      "title": "", "hasFilters": true, "userDashBoardType": 'friend'
    },
    "/settings": {
      "title": "Settings", "hasFilters": false
    },
    "/item/:item_id": {
      "title": "", "hasFilters": false
    },
    "/solicits/:perview_id": {
      "": "solicits", "hasFilters": false, "userDashBoardType": 'solicit'
    },
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
        history.push({ pathname: `/myperviews` });
      } else {
        history.push({ pathname: `/friend/${friendId}` });
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
                  className="perviewcard__popover-user-img" src={util.generateUserImageUrl(friend.facebookId, 'square')} alt="User"/>
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

  const renderCreateSolicit = () => {
    if (match && pageSettings[match.path]) {
      if(pageSettings[match.path].hasCreateSolicit) {
        return (
          <CreateSolicitForm
            currentUser={currentUser}
            createPerview={createPerview}
            history={history}
          />
        )
      }
    }
  }

  const renderUserHero = () => {
    if (toShowUserDashBoard && match && pageSettings[match.path].userDashBoardType){
      let dashBoardType =  pageSettings[match.path].userDashBoardType;
      let user;

      if (dashBoardType === 'self') {
        user = currentUser;
      } else if (dashBoardType === 'friend') {
        user = userFriend;
      };

      if (user.facebookId) {
        return (
          <div className="navbar__dashboard">
            <div className="navbar__dashboard-photo">
              <img
                className="navbar__dashboard-img" src={util.generateUserImageUrl(user.facebookId, 'square')}
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

                <div className="perviewcard__numlikers-box">
                  <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={popoverClickFriendClose} className="myperviews__popovertrigger">
                    <span className="navbar__dashboard-numfriends">
                      {user.numFriends}
                      <span className="navbar__dashboard-text">
                        friends
                      </span>
                    </span>
                  </OverlayTrigger>
                </div>

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

  const renderSolicitHero = () => {
    if (match && match.path && pageSettings[match.path].userDashBoardType === 'solicit') {
      console.log('hits solicit', solicit)
      if (solicit.userDto) {
        return (
          <div>
            <FriendHero
              user={solicit.userDto}
              tags={solicit.tags}
              handleFriendClick={handleFriendClick}
            />
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
        <div className="flexcolumn navbar__title">
          <div className="navbar__hero">
            {renderCreateSolicit()}
            {renderUserHero()}
            {renderSolicitHero()}
          </div>

          <span className="navbar__title-text">
            {(match && pageSettings[match.path]) ? pageSettings[match.path]["title"] : ""}
          </span>
        </div>
        {renderFilters()}
      </div>
    </div>
  )
}

export default withRouter(NavBar);
