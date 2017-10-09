import "../../styles/stylesheets/narrowperview.css"
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import PerviewCard from './PerviewCard/PerviewCard.js';

const NarrowPerview = ({ currentUserId, perviews, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, editPerview, deletePerview, history, toRenderUserProfile }) => {

  const handleFriendClick = (friendId) => {
    return (e) => {
      if (currentUserId === friendId) {
        history.replace({ pathname: `/myperviews` });
      } else {
        history.replace({ pathname: `/friend/${friendId}` });
      }
    }
  }

  const renderFirstReviewBadge = (perview) => {
    if (perview.firstToPerviewItem) {
      return (
        <div className="narrowperviews__badge-container">
          <img className="narrowperviews__badge-first"
          src="https://png.icons8.com/medal-first-place/dusk/64"
          title="First to Perview"/>
        </div>
      )
    }
  }
  const renderPeriviewCard = (perview, {item, perviewUser}) => (
    <div className="flexcolumn narrowperviews__reviewbox">
      <PerviewCard
        item = {item}
        currentUserId = {currentUserId}
        perviewUser = { perviewUser }
        perview = {perview}
        likers = {perview.likers}
        bookmarkPerview = {bookmarkPerview}
        unbookmarkPerview = {unbookmarkPerview}
        likePerview = {likePerview}
        unlikePerview = {unlikePerview}
        history = {history}
        toRenderUserProfile = {toRenderUserProfile}
        handleFriendClick = {handleFriendClick}
        editPerview = {editPerview}
        deletePerview = {deletePerview}
      />
    </div>
  )

  const renderPerview = (perview, { item, perviewUser }) => {
    return (
      <div className="flexcolumn narrowperviews__productbox">
        <div className="flexrow perviewcard__review-user">
          <div className="perviewcard__review-user-icon" onClick={handleFriendClick(perviewUser.id)}>
            <img className="perviewcard__review-user-img" src={perviewUser.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
          </div>
          <a className="perviewcard__review-username" onClick={handleFriendClick(perviewUser.id)}>
            <div>{perviewUser.fullName}</div>
          </a>
        </div>


        <div className="narrowperviews__img">
          <Link to={`/item/${item.id}`}>
            <img className="narrowperviews__productimg-photo" src={item.data.imageUrls.large.url} alt="product"/>
          </Link>
        </div>

        <Link to={`/item/${item.id}`} className="narrowperviews__product-name">
          {item.data.title}
        </Link>

        <div className="narrowperviews__price">
          {item.data.lowestNewPrice.formattedAmount}
        </div>

        <div className="flexrow narrowperviews__buybox">
          <a className="buy-btn" href={item.data.detailPageUrl} target="_blank">
            Buy on Amazon
          </a>
        </div>
      </div>
    )
  }


  const renderSolicit = (solicitId, solicitUser) => {

  }

  const renderPerviewOrSolicit = (perview) => {
    if (perview.isSolicit) {

    } else {
      const perviewObject = {
        item:        perview.itemDto,
        perviewUser: perview.userDto
      };

      return (
        <div className="flexcolumn">
          {renderPerview(perview, perviewObject)}
          {renderPeriviewCard(perview, perviewObject)}
        </div>
      )
    }
  }

  const renderFeed = () => {

    if (perviews) {
      return perviews.map((perview, i) => {
        return (
          <div key={`perviewindex__${i}`} className="flexcolumn narrowperviews__box">
            {renderPerviewOrSolicit(perview)}
          </div>
        )
      });
    }
  }

  return (
    <div className="narrowperviews__container">
      { renderFeed() }
    </div>
  )
}

export default withRouter(NarrowPerview);
