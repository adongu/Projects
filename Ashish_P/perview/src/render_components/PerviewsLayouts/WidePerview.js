import "../../styles/stylesheets/wideperview.css"
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

const WidePerview = ({ fetchingUpdate, currentUserId, perviews, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, history }) => {

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

  const renderPerviews = () => {
    if (perviews) {
      perviews = perviews.length > 10 ? perviews.slice(0, 10) : perviews;
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
              <Link to={`/item/${item.id}`} className="wideresults__product-name">
                {item.data.title}
              </Link>
              <div className="flexrow wideresults__product-info">
                <div className="wideresults__product-price">
                  {item.data.lowestNewPrice.formattedAmount}
                </div>
              </div>
                <a className="buy-btn" href={item.data.detailPageUrl} target="_blank">Buy on Amazon</a>
            </div>
          </div>

          <div className="wideresults__perview-right">
            <div className="flexcolumn wideresults__perview-rightbox">
              <div className="wideresults__review-time">
                {moment(perview.ts).format("MMM D")}
              </div>
              <div className="flexrow wideresults__review-user">
                <div className="wideresults__review-user-icon" onClick={handleFriendClick(user.id)}>
                  <img className="wideresults__review-user-img" src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
                </div>
                <a className="wideresults__review-username" onClick={handleFriendClick(user.id)}>
                  {user.fullName}
                </a>
              </div>

              <div className="wideresults__review-stars">
                {renderStars(perview.rating)}
              </div>
              <div className="wideresults__review-text">
                {perview.tags}
              </div>

              <div className="flexrow wideresults__review-social-box">

                <div className="flexrow wideresults__review-social">
                  <span className="wideresults__review-social-icon" >
                    <i onClick={handleSaveClick(perview)} className={`fa fa-bookmark wideresults__review-icon-bookmark ${perview.bookmarkedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
                  </span>
                  <span className="wideresults__review-social-icon">
                    <i onClick={handleLikeClick(perview)} className={`fa fa-heart wideresults__review-icon-like ${perview.likedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
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
