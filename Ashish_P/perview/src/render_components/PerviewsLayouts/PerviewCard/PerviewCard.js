import "../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewcard.css"
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import React from 'react';
import PerviewCardDetailModal from './PerviewCardDetailModal';
import PerviewDeleteConfirmation from './PerviewDeleteConfirmation';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const PerviewCard = ({ currentUserId, perviewUser, item, perview, likers, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, editPerview, deletePerview, history }) => {

  const renderStars = (rating) => {
    let stars = [1, 2, 3, 4, 5];
    return stars.map((ele)=>{
      return (
        <span key={ele} className={ele <= rating ? 'active_star' : 'no_star'} >
          <i className="fa fa-star" aria-hidden="true"></i>
        </span>
      )
    })
  }

  const handleFriendClick = (friendId) => {
    return (e) => {
      if (currentUserId === friendId) {
        history.replace({ pathname: `/myperviews` });
      } else {
        history.replace({ pathname: `/friend/${friendId}` });
      }
    }
  }

  const handleSaveClick = (perview) => {
    return e => {
      if (perview && perview.bookmarkedByLoggedInUser) {
        unbookmarkPerview(perview.id)
      } else {
        bookmarkPerview(perview.id)
      }
    }
  }

  const handleLikeClick = (perview) => {
    return e => {
      if (perview && perview.likedByLoggedInUser) {
        unlikePerview(perview.id);
      } else {
        likePerview(perview.id);
      }
    }
  }

  const confirmDeletePerview = () => {
    return e => {
      if (deletePerview) {
        deletePerview(perview.id)
      }
    }
  }

  const popoverClickRootClose = (
    <Popover id="popover-trigger-click-root-close" title="Popover bottom" className="perviewcard__popover">
      {likers.map((liker) => {
        return (
          <div key={`perviewcard-${perview.id}-${liker.id}`}>
            <div className="perviewcard__popover-icon">
              <img src={liker.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
            </div>
            <div className="perviewcard__popover-name">
              {liker.firstName}
            </div>
          </div>
        )
      })}
    </Popover>
  );

  const renderPopover = () => {
    if (likers.length > 0) {
      return (
        <OverlayTrigger trigger="click" rootClose placement="top" overlay={popoverClickRootClose} className="perviewcard__popovertrigger">
          <a>{likers.length} Likes</a>
        </OverlayTrigger>
      )
    } else {
      return (
        <span>
          0 Likes
        </span>
      )
    }
  }

  const renderNumLikes = (perviewId) => {
    if (likers) {
      return (
        <OverlayTrigger trigger="click" rootClose placement="top" overlay={popoverClickRootClose} className="perviewcard__popovertrigger">
          <a>{likers.length} Likes</a>
        </OverlayTrigger>
      )
    } else {
      return (
        <span>
          0 Likes
        </span>
      )
    }
  }

  const renderPerviewEdit = () => {
    if (history.location.pathname === '/myperviews') {
      return (
        <div className="flexrow perviewcard__editbox">
          <PerviewCardDetailModal
            item = {item}
            perview = {perview}
            editPerview = {editPerview}
            currentUserId = {currentUserId}
            history = {history}
          />

          <PerviewDeleteConfirmation
            confirmDeletePerview = {confirmDeletePerview}
          />
        </div>
      )
    }
  }

  // var user = perview.userDto;
  return (
    <div className="flexcolumn perviewcard__perview-rightbox">
      <div className="perviewcard__review-time">
        {moment(perview.ts).format("MMM D")}
      </div>

      <div>
        <div className="flexrow perviewcard__review-user">
          <div className="perviewcard__review-user-icon" onClick={handleFriendClick(perviewUser.id)}>
            <img className="perviewcard__review-user-img" src={perviewUser.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
          </div>
          <a className="perviewcard__review-username" onClick={handleFriendClick(perviewUser.id)}>
            <div>{perviewUser.fullName}</div>
          </a>
        </div>

        {renderPerviewEdit()}
      </div>

      <div className="perviewcard__review-stars">
        {renderStars(perview.rating)}
      </div>
      <div className="perviewcard__review-text">
        {perview.tags}
      </div>

      <div className="flexrow perviewcard__review-social-box">

        <div className="flexrow perviewcard__review-social">
          <span className="perviewcard__review-social-icon" >
            <i onClick={handleSaveClick(perview)} className={`fa fa-bookmark perviewcard__review-icon-bookmark ${perview.bookmarkedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
          </span>
          <span className="perviewcard__review-social-icon">
            <i onClick={handleLikeClick(perview)} className={`fa fa-heart perviewcard__review-icon-like ${perview.likedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>

            <div className="perviewcard__numperviews">
              {renderNumLikes()}
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}

export default withRouter(PerviewCard);
