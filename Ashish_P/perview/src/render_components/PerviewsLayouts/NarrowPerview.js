import "../../styles/stylesheets/narrowperview.css"
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import PerviewCard from './PerviewCard/PerviewCard.js';
import * as util from '../../actions/util_actions.js';

const NarrowPerview = ({ currentUserId, perviews, createComment, deleteComment, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, editPerview, deletePerview, history, toRenderUserProfile }) => {

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
        createComment = {createComment}
        deleteComment = {deleteComment}
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
    if (item) {
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
    } else {
      return ''
    }
  }

  const renderUserProfile = (perview) => {
    let user = perview.userDto;

    return (
      <div className="flexcolumn narrowperviews__solicit-user">
        <div className="narrowperviews__solicit-date">
          {moment(perview.ts).format("MMM DD, Y")}
        </div>

        <div className="flexrow perviewcard__popover-user">
          <div className="perviewcard__popover-user-icon">
            <img
              onClick={handleFriendClick(user.id)}
              className="perviewcard__popover-user-img" src={util.generateUserImageUrl(user.facebookId, 'square')} alt="User"/>
          </div>

          <a onClick={handleFriendClick(user.id)} className="perviewcard__popover-username">
            {user.firstName}
          </a>
        </div>

        <p>
          is looking for recommendations for
        </p>
      </div>
    )
  }

  const renderPerviewOrSolicit = (perview, perviewObject) => {
    if (perview.solicit) {
      return (
        <div className="flexcolumn narrowperviews__content">
          <div className="narrowperviews__userprofile">
            {renderUserProfile(perview)}
          </div>
          <div className="narrowperviews__solicit-tags">
            {perview.tags}
          </div>
        </div>
      )
    } else {
      return (
        <div className="flexcolumn narrowperviews__content">
          {renderPerview(perview, perviewObject)}
        </div>
      )
    }
  }

  const renderFeed = () => {
    if (perviews) {
      return perviews.map((perview, i) => {
        const perviewObject = {
          item:        perview.itemDto,
          perviewUser: perview.userDto
        };

        return (
          <div
            key={`perviewindex__${i}`}
            className="flexcolumn narrowperviews__box"
          >
            {renderPerviewOrSolicit(perview, perviewObject)}
            {renderPeriviewCard(perview, perviewObject)}

            <div className={perview.solicit ? 'narrowperviews__solicitsbackground' : ''}>
            </div>
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
