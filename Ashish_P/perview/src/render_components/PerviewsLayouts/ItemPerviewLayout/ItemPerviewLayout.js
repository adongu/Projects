import "../../../styles/stylesheets/itemperviewlayout.css"
import React from 'react';
import { withRouter } from 'react-router-dom';
import ItemPerviewModal from './ItemPerviewModal';

const ItemPerviewLayout = ({ currentUserId, perviews, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, history }) => {

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
      console.log('hit like', perview);
      if (perview && perview.likedByLoggedInUser) {
        unlikePerview(perview.id);
      } else {
        likePerview(perview.id);
      }
    }
  }

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

  const renderModalLink = (perview) => {
    if (perview.tags && (perview.tags.length > 150) ) {
      return (
        <div className="itemperview__showmore">
          <ItemPerviewModal
            perview = {perview}
            handleSaveClick = {handleSaveClick}
            handleFriendClick = {handleFriendClick}
            handleLikeClick = {handleLikeClick}
            renderStars = {renderStars}
          />
        </div>
      )
    }
  }

  const renderItemSection = () => {
    if (perviews && perviews.length > 0) {
      let item = perviews[0].itemDto;

      return (
        <section className="flexcolumn itemperview__itemcontainer">
          <div className="flexrow itemperview__itembox">
            <div className="itemperview__itemimgbox">
              <img className="itemperview__itemimg" src={item.data.imageUrls.large.url} alt="Item"/>
            </div>
            <div className="flexcolumn itemperview__iteminfobox">
              <div className="itemperview__itemname">{item.data.title}</div>
              <div className="itemperview__itemprice">{item.data.lowestNewPrice.formattedAmount}</div>
              <div className="itemperview__itembuy">
                <a className="buy-btn" href={item.data.detailPageUrl} target="_blank">Buy on Amazon</a>
              </div>
            </div>
          </div>
        </section>
      )
    }
  }

  const renderPerviews = () => {
    if (perviews) {
      return perviews.map((perview) => {
        var user = perview.userDto;
        return (
          <div className="flexcolumn itemperview__perviewbox" key={`item-${perview.itemDto.id}_Perview-${perview.id}`}>
            <div className="flexrow itemperview__userbox">
              <span className="itemperview__userimgbox">
                <img className="itemperview__userimg" onClick={handleFriendClick(user.id)} src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
              </span>
              <span className="itemperview__username">{user.firstName}</span>
            </div>
            <div className="itemperview__ratingbox">
              {renderStars(perview.rating)}
            </div>
            <div className="itemperview__reviewbox">
              <p className="itemperview__review">
                {perview.tags.substr(0, 155)}
              </p>
              {renderModalLink(perview)}
            </div>
            <div className="itemperview__socialbox">
              <span className="itemperview__social-bookmark" onClick={handleSaveClick(perview)}>
                <i className={`fa fa-bookmark-o itemperview__icon-bookmark ${perview.bookmarkedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
              </span>
              <span className="itemperview__social-like" >
                <i onClick={handleLikeClick(perview)} className={`fa fa-heart-o itemperview__icon-like ${perview.likedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
              </span>
            </div>
          </div>
        )
      })
    }
  }

  return (
    <div className="flexcolumn itemperview__layoutcontainer">
      {renderItemSection()}
      <div className="itemperview__perviewcontainer">
        <div className="itemperview__perviewcenterbox">
          {renderPerviews()}
        </div>
      </div>
    </div>
  )
}

export default withRouter(ItemPerviewLayout)