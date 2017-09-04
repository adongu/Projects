import "../../styles/stylesheets/wideperview.css"
import product from "../../styles/assets/product.jpg"
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import moment from 'moment';

const WidePerview = ({ currentUserId, perviews, bookmarkPerview, likePerview, history }) => {

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

  const handleSaveClick = (perviewId) => {
    return e => {
      if (e.currentTarget.className === 'wideresults__review-social-icon') {
        e.currentTarget.className = 'wideresults__review-social-icon active';
      } else {
        e.currentTarget.className = 'wideresults__review-social-icon';
      }

      if (bookmarkPerview) {
        bookmarkPerview(perviewId);
      }
    }
  }

  const handleLikeClick = (perviewId) => {
    return e => {
      if (e.currentTarget.className === 'wideresults__review-social-icon') {
        e.currentTarget.className = 'wideresults__review-social-icon active';
      } else {
        e.currentTarget.className = 'wideresults__review-social-icon';
      }

      if (likePerview) {
        likePerview(perviewId);
      }
    }
  }

  const renderPerviews = () => {
    if (perviews) {
      return perviews.map((perview, i) => {
        var item = perview.itemDto;
        var user = perview.userDto;
        return (
          <div key={`perviewindex__${perview.id}`} className="flexrow wideresults__box">
            <div className="flexrow wideresults__perview-left">
              <div className="wideresults__productimg">
                <Link to={`/item/${item.id}`}>
                  <img className="wideresults__productimg-photo" src={item.data.imageUrls.large.url} alt="Product"/>
                </Link>
            </div>
            <div className="flexcolumn wideresults__perview-left-info">
              <div className="wideresults__product-title">{item.data.title}</div>
              <div className="flexrow wideresults__product-info">
                <div className="wideresults__product-price">{item.data.lowestNewPrice.formattedAmount}</div>
              </div>
              <ButtonToolbar>
                <Button className="wideresults__product-buybtn" href={item.data.detailPageUrl} target="_blank">BUY AT AMAZON</Button>
              </ButtonToolbar>
            </div>
          </div>
          <div className="wideresults__perview-right">
            <div className="flexcolumn wideresults__perview-rightbox">
              <div className="wideresults__review-time">{moment(perview.ts).format("MMM D")}</div>
              <div className="flexrow wideresults__review-user">
                <div className="wideresults__review-user-icon" onClick={handleFriendClick(user.id)}>
                  <img className="wideresults__review-user-img" src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
                </div>
                <div className="wideresults__review-username">{user.fullName}</div>
              </div>
              <div className="wideresults__review-stars">
                {renderStars(perview.rating)}
              </div>
              <div className="wideresults__review-text">{perview.tags}</div>
              <div className="flexrow wideresults__review-social-box">
                <div className="wideresults__likes-box">
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  <span className="wideresults__likes">{perview.likedByLoggedInUser ? perview.likedByLoggedInUser : ''} Likes</span>
                </div>

                <div className="flexrow wideresults__review-social">
                  <span className="wideresults__review-social-icon" onClick={handleSaveClick(perview.id)}>
                    <i className="fa fa-bookmark-o wideresults__review-icon-save" aria-hidden="true"></i>
                  </span>
                  <span className="wideresults__review-social-icon" onClick={handleLikeClick(perview.id)}>
                    <i className="fa fa-heart-o wideresults__review-icon-like" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      });
    } else {
      return (
        <div>
          No favorite perviews yet :)
        </div>
      )
    }
  }

  return (
    <div className="wideresults__container">
      { renderPerviews() }
    </div>
  )
}
export default withRouter(WidePerview);
