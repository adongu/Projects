import "../../styles/stylesheets/narrowperview.css"
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
import PerviewCard from './PerviewCard/PerviewCard.js';
import * as util from '../../actions/util_actions.js';

const NarrowPerview = ({ currentUserId, perviews, createComment, deleteComment, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, editPerview, deletePerview, showLoginModal, history, toRenderUserProfile }) => {

  const handleFriendClick = (friendId) => {
    return (e) => {
      if (currentUserId) {
        if (currentUserId === friendId) {
          history.replace({ pathname: `/myperviews` });
        } else {
          history.replace({ pathname: `/friend/${friendId}` });
        }
      } else {
        if (showLoginModal) {
          showLoginModal();
        }
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
        showLoginModal = {showLoginModal}
        history = {history}
        toRenderUserProfile = {toRenderUserProfile}
        handleFriendClick = {handleFriendClick}
        editPerview = {editPerview}
        deletePerview = {deletePerview}
      />
    </div>
  )

  const popoverClickRootClose = (
    <Popover
      id="popover-trigger-click-root-close"
      className="narrowperviews__popover"
    >
      <span>
        Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on perview.co at the time of purchase will apply to the purchase of this product.
      </span>
    </Popover>
  )

  const renderMoreInfoPopover = () => {
    return (
      <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={popoverClickRootClose} className="narrowperviews__moreinfo-popover">
        <a className="perviewcard__numlikers">
          <i className="fa fa-question-circle-o" aria-hidden="true"></i>
        </a>
      </OverlayTrigger>
    )
  }

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
            Amazon Price: {item.data.listPrice.formattedAmount}

            <a className="buy-btn" href={item.data.detailPageUrl} target="_blank">
              Buy
            </a>
          </div>

          <div className="narrowperviews__moreinfo">
            <span className="narrowperviews__moreinfo-text">
              {`as of ${moment(item.ts).format("HH:mm a Z")}`}
            </span>

            {renderMoreInfoPopover()}
          </div>

        </div>
      )
    } else {
      return ''
    }
  }

  const renderUserProfile = (perview) => {
    let user = perview.userDto;
    // console.log('renderUserProfile for solicit', perview.userDto);
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
            <span>
              {user.firstName} {user.lastName}
            </span>
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
          item:        perview.itemDto || {},
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
    } else {
      return (
        <div className="loading__spinner divwrapper-fullwidth">
          <i className="fa fa-spinner fa-5x fa-pulse" aria-hidden="true"></i>
        </div>
      )
    }
  }

  return (
    <div className="narrowperviews__container">
      { renderFeed() }
    </div>
  )
}

export default withRouter(NarrowPerview);
