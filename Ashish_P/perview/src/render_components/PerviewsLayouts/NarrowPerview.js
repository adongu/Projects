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
        <div className="narrowperviews__img">
          <Link to={`/item/${item.id}`}>
            <img className="narrowperviews__productimg-photo" src={item.data.imageUrls.large.url} alt="product"/>
          </Link>
        </div>

        <Link to={`/item/${item.id}`} className="narrowperviews__product-name">
          {item.data.title}
        </Link>

        <div className="flexrow narrowperviews__buybox">
          {item.data.listPrice.formattedAmount}

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
    const perviewObject = {
      item:        perview.itemDto,
      perviewUser: perview.userDto
    };

    if (perview.solicit) {
      return (
        <div className="flexcolumn narrowperviews__content">
          <span>{perview.tags}</span>
          {renderPeriviewCard(perview, perviewObject)}
        </div>
      )
    } else {
      return (
        <div className="flexcolumn narrowperviews__content">
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
