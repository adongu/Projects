import "../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewcard.css"
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import React from 'react';
import PerviewCardDetailModal from './PerviewCardDetailModal';
import PerviewDeleteConfirmation from './PerviewDeleteConfirmation';

const PerviewCard = ({ currentUserId, perviewUser, perview, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, editPerview, deletePerview, history }) => {

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

  const renderPerviewEdit = () => {
    if (history.pathname === '/myperviews') {
      return (
        <div className="flexrow narrowperviews__editbox">
          <PerviewCardDetailModal
            perview = {perview}
            editPerview = {editPerview}
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
            {perviewUser.fullName}
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

            <span className="perviewcard__numlikes"></span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default withRouter(PerviewCard);
