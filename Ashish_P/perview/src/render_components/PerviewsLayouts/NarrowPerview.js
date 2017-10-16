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

  const renderUserProfile = (perview) => {
    let user = perview.userDto;

    return (
      <div className="flexcolumn narrowperview__solicit-user">
        {moment(perview.ts).format("MMM DD, Y")}

        <div className="flexrow perviewcard__popover-user">
          <div className="perviewcard__popover-user-icon">
            <img
              onClick={handleFriendClick(user.id)}
              className="perviewcard__popover-user-img" src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
          </div>

          <a onClick={handleFriendClick(user.id)} className="perviewcard__popover-username">
            {user.firstName}
          </a>
        </div>

        <p>
          Is looking for suggestions for
        </p>
      </div>
    )
  }

  const renderPerviewOrSolicit = (perview, perviewObject) => {
    if (perview.solicit) {
      return (
        <div className="flexcolumn narrowperviews__content">
          {renderUserProfile(perview)}
          <span>{perview.tags}</span>
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
          <div key={`perviewindex__${i}`} className="flexcolumn narrowperviews__box">
            <div className="flexcolumn narrowperviews__productbox">
              <span className="narrowperviews__badges">
                {renderFirstReviewBadge(perview)}
              </span>
              <div className="narrowperviews__img">
                <Link to={`/item/${item.id}`}>
                  <img className="narrowperviews__productimg-photo" src={item.data.imageUrls.large.url} alt="product"/>
                </Link>
              </div>

              <Link to={`/item/${item.id}`} className="narrowperviews__product-name">
                {item.data.title}
              </Link>

              <div className="narrowperviews__price">{item.data.listPrice.formattedAmount}</div>

              <div className="flexrow narrowperviews__buybox">
                <a className="buy-btn" href={item.data.detailPageUrl} target="_blank">Buy on Amazon</a>
              </div>
            </div>

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
