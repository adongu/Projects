// Migrate over bookmark comments and likes
import React from 'react';

const SocialBar = ({perview, currentUserId, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview}) => {

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

      <span
        // onClick={handleLikeClick(perview)}
        className={`perviewcard__review-social-btn ${perview.likedByLoggedInUser ? "active" : ""}`}
      >
        <i
          className={`fa fa-comment perviewcard__review-icon-comment ${perview.likedByLoggedInUser ? "active" : ""}`}
          aria-hidden="true">
        </i>
        <span>
        </span>
      </span>
    </div>
  )
}

export default SocialBar;
