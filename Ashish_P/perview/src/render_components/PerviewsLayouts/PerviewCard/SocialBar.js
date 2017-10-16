// Migrate over bookmark comments and likes
import React from 'react';
import PerviewDetailModal from './PerviewDetailModal';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const SocialBar = ({currentUserId, perview, likers, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, handleFriendClick}) => {

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

  const popoverClickRootClose = likers ? (
    <Popover
      id="popover-trigger-click-root-close"
      title="Likers"
      className="perviewcard__popover"
    >
      <div>
        {likers.map((liker) => {
          return (
            <div key={`perviewcard-${perview.id}-${liker.id}`} className="flexrow perviewcard__popover-user">
              <div className="perviewcard__popover-user-icon">
                <img
                  onClick={handleFriendClick(liker.id)}
                  className="perviewcard__popover-user-img" src={liker.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
              </div>

              <a onClick={handleFriendClick(liker.id)} className="perviewcard__popover-username">
                {liker.firstName}
              </a>
            </div>
          )
        })}

      </div>
    </Popover>
  ) : (
    <div></div>
  );

  const renderNumLikes = () => {
    if (likers) {
      return (
        <OverlayTrigger trigger="click" placement="top" rootClose overlay={popoverClickRootClose} className="perviewcard__popovertrigger">
          <a className="perviewcard__numlikers">{likers.length}</a>
        </OverlayTrigger>
      )
    }
  }

  const renderCommentsModal = (perview) => {
    if (perview.comments) {
      return (
        <div className="perviewcard__detailmodalwrapper">
          <PerviewDetailModal
            perview = {perview}
            handleSaveClick = {handleSaveClick}
            handleFriendClick = {handleFriendClick}
            handleLikeClick = {handleLikeClick}
            toRenderPerviewCardDetailsView = {true}
          />
        </div>
      )
    }
  }

  return (
    <div className="flexrow divwrapper-fullwidth">
      <span
        onClick={handleSaveClick(perview)}
        className={`perviewcard__review-social-btn ${perview.bookmarkedByLoggedInUser ? "active" : ""}`}
      >
        <i className={`fa fa-bookmark perviewcard__review-icon-bookmark ${perview.bookmarkedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
        <span className="perviewcard__review-social-text">
          {perview.bookmarkedByLoggedInUser ? 'Bookmarked' : 'Bookmark'}
        </span>
      </span>

      <div className="flexrow">
        <span
          onClick={handleLikeClick(perview)}
          className={`perviewcard__review-social-btn ${perview.likedByLoggedInUser ? "active" : ""}`}
        >
          <i
            className={`fa fa-heart perviewcard__review-icon-like ${perview.likedByLoggedInUser ? "active" : ""}`}
            aria-hidden="true">
          </i>

          <span className="perviewcard__review-social-text">
            {perview.likedByLoggedInUser ? 'Liked' : 'Like'}
          </span>

        </span>

        <div className="perviewcard__numlikers-box">
          {renderNumLikes()}
        </div>
      </div>

      <span
        className='perviewcard__review-social-btn'
      >
        <i
          className='fa fa-comments perviewcard__review-icon-comment'
          aria-hidden="true">
        </i>
      </span>
    </div>
  )
}

export default SocialBar;
