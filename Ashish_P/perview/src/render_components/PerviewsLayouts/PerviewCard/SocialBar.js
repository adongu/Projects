// Migrate over bookmark comments and likes
import React from 'react';
import PerviewDetailModal from './PerviewDetailModal';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import * as util from '../../../actions/util_actions.js';

const SocialBar = ({currentUserId, perview, likers, createComment, deleteComment, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, handleFriendClick}) => {

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
                  className="perviewcard__popover-user-img" src={util.generateUserImageUrl(liker.facebookId, 'square')} alt="User"/>
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
    if (likers && likers.length > 0) {
      return (
        <OverlayTrigger trigger="click" placement="top" rootClose overlay={popoverClickRootClose} className="perviewcard__popovertrigger">
          <a className="perviewcard__numlikers">
            {likers.length}
          </a>
        </OverlayTrigger>
      )
    }
  }

  const renderNumComments = () => {
    if (perview.comments && perview.comments.length > 0) {
      return (
        <span>
          {perview.comments.length}
        </span>
      )
    }
  }

  const renderCommentsModal = () => {
    if (perview.comments) {
      return (
        <div className="perviewcard__detailmodalwrapper">
          <PerviewDetailModal
            perview = {perview}
            createComment={createComment}
            deleteComment={deleteComment}
            handleSaveClick = {handleSaveClick}
            handleFriendClick = {handleFriendClick}
            handleLikeClick = {handleLikeClick}
            toRenderPerviewCommentsView = {true}
            renderStars = {util.renderStars}
          />
        </div>
      )
    } else {
      return (
        <div className="perviewcard__detailmodalwrapper">
          Comments
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
          {perview.bookmarkedByLoggedInUser ? 'Saved' : 'Save'}
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

      <div className="flexrow">
        <span
          className='perviewcard__review-social-btn'
        >
          <i
            className='fa fa-comments perviewcard__review-icon-comment'
            aria-hidden="true">
          </i>

          <span className="perviewcard__review-social-text">
            {renderCommentsModal()}
          </span>
        </span>
        <span>
          {renderNumComments()}
        </span>
      </div>
    </div>
  )
}

export default SocialBar;
