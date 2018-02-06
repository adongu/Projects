import "../../styles/stylesheets/narrowperview.css"
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import PerviewCard from './PerviewCard/PerviewCard.js';
import { Grid, Row, Col } from 'react-bootstrap';

// import {
//   renderMoreInfoPopover
// } from '../SharedComponents/PricePopOver';
import * as util from '../../actions/util_actions.js';

const NarrowPerview = ({ currentUserId, perviews, createComment, deleteComment, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, editPerview, deletePerview, showLoginModal, history, toRenderUserProfile }) => {

  const handleFriendClick = (friendId) => {
    return (e) => {
      if (currentUserId) {
        if (currentUserId === friendId) {
          history.push({ pathname: `/myperviews` });
        } else {
          history.push({ pathname: `/friend/${friendId}` });
        }
      } else {
        if (this.showLoginModal) {
          this.showLoginModal();
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

  const renderPerview = (perview, { item, perviewUser }) => {
    if (item) {
      let latestUpdatedTime = item.ts;

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
            <span>{`${item.data.listPrice.formattedAmount}`}</span>

            <a className="buy-btn" href={item.data.detailPageUrl} target="_blank">
              Buy {!!(item.siteName) ? "on " + item.siteName : ""}
            </a>
          </div>

          {/* {renderMoreInfoPopover(latestUpdatedTime)} */}
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
          <div
            onClick={() => {history.replace({ pathname: `/solicits/${perview.id}` })}}
            className="narrowperviews__solicit-tags"
          >
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
      if (perviews.length > 0) {
        return perviews.map((perview, i) => {
          const perviewObject = {
            item:        perview.itemDto || {},
            perviewUser: perview.userDto
          };

          return (
            <Col
              key={`perviewindex__${i}`}
              xs={12}
              sm={6}
              md={4}
            >
              <div className="flexcolumn narrowperviews__box">
                {renderPerviewOrSolicit(perview, perviewObject)}
                {renderPeriviewCard(perview, perviewObject)}

                <div
                  className={perview.solicit ? 'narrowperviews__solicitsbackground' : ''}
                />
              </div>
            </Col>
          )
        });
      } else {
        return (
          <div>
            Be the first of your friends to leave a perview!
          </div>
        )
      }
    }

    return (
      <Col className="loading__spinner divwrapper-fullwidth">
        <i className="fa fa-spinner fa-5x fa-pulse" aria-hidden="true"></i>
      </Col>
    )
  }

  return (
    <Grid className="narrowperviews__container">
      <Row>
        {renderFeed()}
      </Row>
    </Grid>
  )
}

export default withRouter(NarrowPerview);
