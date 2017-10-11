import "../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewcard.css"
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import PerviewEditModal from './PerviewEditModal';
import PerviewDetailModal from './PerviewDetailModal';
import PerviewDeleteConfirmation from './PerviewDeleteConfirmation';
import CreatePerviewModalContainer from '../../../containers/CreatePerviewModalContainer';

const PerviewCard = ({ currentUserId, perviewUser, item, perview, likers, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, editPerview, deletePerview, handleFriendClick, history, toRenderUserProfile }) => {

  const renderStars = (rating) => {
    let stars = [1, 2, 3, 4, 5];
    return stars.map((ele)=>{
      return (
        <span key={ele} classNadeeme={ele <= rating ? 'active_star' : 'no_star'} >
          <i className="fa fa-star" aria-hidden="true"></i>
        </span>
      )
    })
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

  const confirmDeletePerview = (perviewId) => {
    if (deletePerview) {
      deletePerview(perview.id)
    }
  }

  const renderAndMoreLikes = () => {
    if (likers.length > 1) {
      let numLikersMore = likers.length - 1;
      return (
        <span>
          and {numLikersMore} More...
        </span>
      )
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
                  onClick={() => handleFriendClick(liker.id)}
                  className="perviewcard__popover-user-img" src={liker.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
              </div>

              <a onClick={() => handleFriendClick(liker.id)} className="perviewcard__popover-username">
                {liker.firstName}
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

  const renderNumLikes = () => {
    if (likers) {
      return (
        <OverlayTrigger trigger="click" placement="top" rootClose overlay={popoverClickRootClose} className="perviewcard__popovertrigger">
          <a className="perviewcard__numlikers">{likers.length}</a>
        </OverlayTrigger>
      )
    }
  }

  const renderPerviewEdit = () => {
    if (history.location.pathname === '/myperviews') {
      return (
        <div className="flexrow perviewcard__editbox">
          <div className="perviewcard__edit-container" alt="Edit Perview">
            <PerviewEditModal
              item = {item}
              perview = {perview}
              editPerview = {editPerview}
              currentUserId = {currentUserId}
              history = {history}
            />
          </div>

          <div className="perviewcard__delete-container">
            <PerviewDeleteConfirmation
              perviewId = {perview.id}
              confirmDeletePerview = {confirmDeletePerview}
            />
          </div>
        </div>
      )
    }
  }

  const renderUserProfile = () => {
    if (toRenderUserProfile) {
      return (
        <div className="flexrow perviewcard__review-user">
          <div className="perviewcard__review-user-icon" onClick={() => handleFriendClick(perviewUser.id)}>
            <img className="perviewcard__review-user-img" src={perviewUser.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
          </div>
          <a className="perviewcard__review-username" onClick={() => handleFriendClick(perviewUser.id)}>
            <div>{perviewUser.fullName}</div>
          </a>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  const renderModalLink = (perview) => {
    if (perview.tags && (perview.tags.length > 180) ) {
      return (
        <div className="perviewcard__showmore">
          <PerviewDetailModal
            perview = {perview}
            handleSaveClick = {handleSaveClick}
            handleFriendClick = {handleFriendClick}
            handleLikeClick = {handleLikeClick}
            renderStars = {renderStars}
          />
        </div>
      )
    }
  }

  const renderPerviewOrSolicitContentView = () => {
    if (perview.solicit === true) {
      return renderSolicitContentView;
    } else {
      return renderPerviewContentView;
    }
  }

  const renderPerviewContentView = (
    <div className="flexcolumn perviewcard__perview-rightbox">
      <div className="perviewcard__header">
        <span className="perviewcard__badges">
          {perview.perviewSolicitId ? perview.perviewSolicitId : ""}
        </span>
        <span className="perviewcard__review-time">
          {moment(perview.ts).format("MMM DD, Y")}
        </span>
      </div>

      <div className="perviewcard__perview-options">
        {renderUserProfile()}

        {renderPerviewEdit()}
      </div>

      <div className="perviewcard__review-stars">
        {renderStars(perview.rating)}
      </div>

      <div className="perviewcard__review-tags">
        <p className="perviewcard__review-text">
          {perview.tags.substr(0, 180)}

        </p>
        {renderModalLink(perview)}
      </div>
    </div>
  )

  const renderSolicitContentView = (
    <CreatePerviewModalContainer
      perviewSolicitId={perview.id}
      history={history}
    />
  )

  const renderSocialBar = (
    <div className="flexrow perviewcard__review-social">
      <span
        onClick={handleSaveClick(perview)}
        className={`perviewcard__review-social-btn ${perview.bookmarkedByLoggedInUser ? "active" : ""}`}
      >
        <i className={`fa fa-bookmark perviewcard__review-icon-bookmark ${perview.bookmarkedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
        <span className="perviewcard__review-social-text">
          {perview.bookmarkedByLoggedInUser ? 'Added' : 'Add to Wishlist'}
        </span>
      </span>

      <span
        onClick={handleLikeClick(perview)}
        className={`perviewcard__review-social-btn ${perview.likedByLoggedInUser ? "active" : ""}`}
      >
        <i className={`fa fa-heart perviewcard__review-icon-like ${perview.likedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
        <span className="perviewcard__review-social-text">
          {perview.likedByLoggedInUser ? 'Liked' : 'Like'}
        </span>
      </span>
      <div className="perviewcard__numlikers-box">
        {renderNumLikes()}
      </div>
    </div>
  )



  // var user = perview.userDto;
  return (
      <div className="flexrow perviewcard__review-social-box">
        {renderPerviewOrSolicitContentView()}
        {renderSocialBar}
    </div>
  )
}

export default withRouter(PerviewCard);
