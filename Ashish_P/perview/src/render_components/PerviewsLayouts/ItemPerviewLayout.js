import "../../styles/stylesheets/itemperviewlayout.css"
import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

const ItemPerviewLayout = ({ perviews, bookmarkPerview, likePerview, history }) => {

  const handleFriendClick = (friendId) => {
    return (e) => {
      history.replace({ pathname: `/friend/${friendId}` });
    }
  }

  const handleSaveClick = (perviewId) => {
    return e => {
      if (e.currentTarget.className === 'itemperview__social-icon') {
        e.currentTarget.className = 'itemperview__social-icon active';
      } else {
        e.currentTarget.className = 'itemperview__social-icon';
      }

      if (bookmarkPerview) {
        bookmarkPerview(perviewId);
      }
    }
  }

  const handleLikeClick = (perviewId) => {
    return e => {
      if (e.currentTarget.className === 'itemperview__social-icon') {
        e.currentTarget.className = 'itemperview__social-icon active';
      } else {
        e.currentTarget.className = 'itemperview__social-icon';
      }

      if (likePerview) {
        likePerview(perviewId);
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
                <ButtonToolbar>
                  <Button className="itemperview__itembuy-btn" href={item.data.detailPageUrl}>BUY AT AMAZON</Button>
                </ButtonToolbar>
              </div>
            </div>
          </div>
          <div className="itemperview__numperviewbox">
            <span className="itemperview__numperview">
              {perviews ? `Perview by ${perviews.length} Friends` : "Be the first one to leave a perview!"}
            </span>
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
            <div className="itemperview__timestamp">{moment(perview.ts).calendar()}</div>
            <div className="flexrow itemperview__userbox">
              <span className="itemperview__userimgbox">
                <img className="itemperview__userimg" onClick={handleFriendClick(user.id)} src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
              </span>
              <span className="itemperview__username">{user.firstName}</span>
            </div>
            <div className="itemperview__ratingbox">
              {renderStars(perview.rating)}
            </div>
            <div className="itemperview__reviewbox">{perview.tags}</div>
            <div className="itemperview__socialbox">
              <span className="itemperview__social-bookmark" onClick={handleSaveClick(perview.id)}>
                <i className="fa fa-bookmark-o itemperview__icon-bookmark" aria-hidden="true"></i>
              </span>
              <span className="itemperview__social-like" onClick={handleLikeClick(perview.id)}>
                <i className="fa fa-heart-o itemperview__icon-like" aria-hidden="true"></i>
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
          {renderPerviews()}
          {renderPerviews()}
          {renderPerviews()}
          {renderPerviews()}
        </div>
      </div>
    </div>
  )
}

export default withRouter(ItemPerviewLayout)
