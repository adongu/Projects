import "../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewcard.css"
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import React from 'react';
import PerviewEditModal from './PerviewEditModal';
import PerviewDetailModal from './PerviewDetailModal';
import PerviewDeleteConfirmation from './PerviewDeleteConfirmation';
import CreatePerviewModalContainer from '../../../containers/CreatePerviewModalContainer';
import SocialBar from './SocialBar';
import * as util from '../../../actions/util_actions.js';

const PerviewCard = ({ currentUserId, perviewUser, item, perview, likers, createComment, deleteComment, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, editPerview, deletePerview, showLoginModal, history, toRenderUserProfile }) => {

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

  const handleFriendClick = (friendId) => {
    return (e) => {
      if (currentUserId) {
        if (currentUserId === friendId) {
          history.push({ pathname: `/myperviews` });
        } else {
          history.push({ pathname: `/friend/${friendId}` });
        }
      } else {
        if (showLoginModal) {
          showLoginModal();
        }
      }
    }
  }

  const handleSuggestionClick = () => {
    if (currentUserId) {
      history.push({ pathname: `/solicits/${perview.id}`});
    } else {
      showLoginModal();
    }
  }

  const confirmDeletePerview = (perviewId) => {
    if (deletePerview) {
      deletePerview(perview.id)
    }
  }

  const renderFirstReviewBadge = () => {
    if (perview.firstToPerviewItem) {
      return (
        <div className="flexrow perviewcard__badge-container">
          <img
            src="https://png.icons8.com/medal-first-place/dusk/64"
            className="perviewcard__badge-first"
            title="First to Perview"
            alt="first to perview badge"
          />
        </div>
      )
    }
  }

  const renderPerviewEdit = () => {
    if (history.location.pathname === '/myperviews') {
      return (
        <div className="flexrow perviewcard__editbox">
          <div className="perviewcard__edit-container" alt="Edit Perview">
            <PerviewEditModal
              currentUserId = {currentUserId}
              item = {item}
              perview = {perview}
              editPerview = {editPerview}
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
    if (perviewUser && toRenderUserProfile && !perview.solicit) {
      return (
        <div className="flexrow perviewcard__review-user">
          <div className="perviewcard__review-user-icon">
            <img className="perviewcard__review-user-img"
              onClick={handleFriendClick(perviewUser.id)}
              src={util.generateUserImageUrl(perviewUser.facebookId, 'square')}
              alt="User"
            />
          </div>
          <a
            onClick={handleFriendClick(perviewUser.id)}
            className="flexcolumn perviewcard__review-username"
          >
            <div></div>
            <div>{perviewUser.fullName}</div>
            <div>{renderFirstReviewBadge()}</div>
          </a>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  const renderPerivewCardHeaderBar = () => {
    return (
      <div className="divwrapper-fullwidth">
        <div className="perviewcard__header">
          <span className="perviewcard__review-time">
            {perview.solicit ? '' : moment(perview.ts).format("MMM DD, Y")}
          </span>
        </div>

        <div className="flexrow perviewcard__perview-options">
          <div className="flexcolumn divwrapper-fullwidth">
            {renderUserProfile()}
            {history.location.pathname === '/myperviews' ? renderFirstReviewBadge() : ''}
          </div>
          {renderPerviewEdit()}
        </div>
      </div>
    );
  };

  const renderModalLink = (perview) => {
    if (perview.tags && (perview.tags.length > 155) ) {
      return (
        <div className="perviewcard__showmore">
          <PerviewDetailModal
            perview = {perview}
            currentUserId = {currentUserId}
            handleSaveClick = {handleSaveClick}
            handleFriendClick = {handleFriendClick}
            handleLikeClick = {handleLikeClick}
            renderStars = {renderStars}
            showLoginModal = {showLoginModal}
            toRenderPerviewCardDetailsView = {true}
          />
        </div>
      );
    }
  }

  const renderPerviewOrSolicitContentView = () => {
    if (perview.solicit) {
      return renderSolicitContentView();
    } else {
      return renderPerviewContentView;
    }
  }

  const renderPerviewContentView = (
    <div className="flexcolumn perviewcard__perview-rightbox">
      <div className="perviewcard__review-stars">
        {renderStars(perview.rating)}
      </div>

      <div className="perviewcard__review-tags">
        <span className="perviewcard__review-text">
          {perview.tags ? perview.tags.substr(0, 155) : ""}
        </span>
        <span>{renderModalLink(perview)}</span>
      </div>
    </div>
  )

  const renderSolicitContentView = () => {
    return (
      <div className="flexcolumn perviewcard__solicitcard">
        <CreatePerviewModalContainer
          perviewSolicitId={perview.id}
          perviewSolicitTags={perview.tags}
          perviewSolicitFirstName={perview.userDto.firstName}
          history={history}
        />

        <div
          onClick={handleSuggestionClick}
          className="suggestions"
        >
          <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
          <span>See Suggestions</span>
        </div>
      </div>
    );
  };

  const renderSocialBar = () => {
    return (
      <div className="flexrow perviewcard__review-social">
        <div className="flexrow divwrapper-fullwidth">
          <SocialBar
            currentUserId={currentUserId}
            perview={perview}
            likers={likers}
            createComment={createComment}
            deleteComment={deleteComment}
            handleFriendClick={handleFriendClick}
            bookmarkPerview={bookmarkPerview}
            unbookmarkPerview={unbookmarkPerview}
            likePerview={likePerview}
            unlikePerview={unlikePerview}
            showLoginModal={showLoginModal}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flexcolumn perviewcard__review-social-box">
        {renderPerivewCardHeaderBar()}
        {renderPerviewOrSolicitContentView()}
        {renderSocialBar()}
    </div>
  );
}

export default withRouter(PerviewCard);
