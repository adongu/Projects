import "../../../styles/stylesheets/itemperviewlayout.css"
import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import PerviewCard from '../PerviewCard/PerviewCard.js';
import {
  renderMoreInfoPopover
} from '../../SharedComponents/PricePopOver';

const ItemPerviewLayout = ({ currentUserId, perviews, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, history, toRenderUserProfile }) => {

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
              <div className="flexcolumn itemperview__itemprice">
                {`Amazon.com Price: ${item.data.listPrice.formattedAmount}`}
                {renderMoreInfoPopover()}
              </div>

              <div className="itemperview__itembuy">
                <a className="buy-btn" href={item.data.detailPageUrl} target="_blank">Buy</a>
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
        let user = perview.userDto;
        let item = perviews[0].itemDto;

        return (
          <div className="flexcolumn itemperview__perviewbox" key={`item-${perview.itemDto.id}_Perview-${perview.id}`}>
            <PerviewCard
              item = {item}
              currentUserId = {currentUserId}
              perviewUser = { user }
              perview = {perview}
              likers = {perview.likers}
              bookmarkPerview = {bookmarkPerview}
              unbookmarkPerview = {unbookmarkPerview}
              likePerview = {likePerview}
              unlikePerview = {unlikePerview}
              history = {history}
              toRenderUserProfile = {toRenderUserProfile}
            />
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
