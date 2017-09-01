import "../../styles/stylesheets/wideperview.css"
import product from "../../styles/assets/product.jpg"
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import moment from 'moment';

const WidePerview = ({ perviews, bookmarkPerview, likePerview, history }) => {

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
      // console.log(friendId);
      // console.log(this.props);
      history.replace({ pathname: `/friend/${friendId}` });
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
        console.log('bookmark', perviewId);
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
        console.log('likeperview', perviewId);
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
          <div key={`perviewindex__${i}`} className="flexrow wideresults__box">
            <div className="flexrow wideresults__perview-left">
              <div className="wideresults__productimg"><img className="wideresults__productimg-photo" src={item.data.imageUrls.large.url} alt="Product"/>
            </div>
            <div className="flexcolumn wideresults__perview-left-info">
              <div className="wideresults__product-title">{item.data.title}</div>
              <div className="flexrow wideresults__product-info">
                <div className="wideresults__product-price">{item.data.lowestNewPrice.formattedAmount}</div>
              </div>
              <ButtonToolbar>
                <Button className="wideresults__product-buybtn" href={item.data.detailPageUrl}>BUY AT AMAZON</Button>
              </ButtonToolbar>
            </div>
          </div>
          <div className="wideresults__perview-right">
            <div className="flexcolumn wideresults__perview-rightbox">
              <div className="wideresults__review-time">{moment(perview.ts).calendar()}</div>
              <div className="flexrow wideresults__review-user">
                <div className="wideresults__review-user-icon" onClick={handleFriendClick(user.id)}><img className="wideresults__review-user-img" src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/></div>
                <div className="wideresults__review-username">{user.fullName}</div>
              </div>
              <div className="wideresults__review-stars">
                {renderStars(perview.rating)}
              </div>
              <div className="wideresults__review-text">{perview.tags}</div>
              <div className="flexrow wideresults__review-social-box">
                <div className="flexrow wideresults__review-social">
                  <div className="wideresults__review-social-icon" onClick={handleSaveClick(perview.id)}>
                    <i className="fa fa-bookmark wideresults__review-icon-save" aria-hidden="true"></i>
                  </div>
                  <div className="wideresults__review-social-icon" onClick={handleLikeClick(perview.id)}>
                    <i className="fa fa-heart wideresults__review-icon-like" aria-hidden="true"></i>
                  </div>
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

//
// Array[{}]
//   img: itemDto.data.imageUrls.large.url
//   title: itemDto.data.title
//   price: itemDto.data.lowestNewPrice.formattedAmount
//   numPerviews: itemDto.data.
//   categoryId: itemDto.categoryDto.id
//   buyUrl: itemDto.data.detailPageUrl
//
// import moment from 'moment';
//
//   time: moment(ts).calendar();
//   icon: userDto.facebookProfilePictureUrl.replace(/\/picture$/, "")
//   username: userDto.fullName
//   userId: userDto.id
//   rating: rating
//   tags: tags??
//   comment: comments?? need to parse tags from comments
//   numComments:?
//   likes: ? need to send in as array likers.length
//   perviewId: id
//   save(favorite/cart): function:
//   like: function
//   sharing:?

export default withRouter(WidePerview);
