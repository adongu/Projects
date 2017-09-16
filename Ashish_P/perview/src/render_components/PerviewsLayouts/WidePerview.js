import "../../styles/stylesheets/wideperview.css"
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PerviewCard from './PerviewCard/PerviewCard.js';


const WidePerview = ({ fetchingUpdate, currentUserId, perviews, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, history }) => {

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
            <PerviewCard
              currentUserId = {currentUserId}
              perviewUser = { user }
              perview = {perview}
              bookmarkPerview = {bookmarkPerview}
              unbookmarkPerview = {unbookmarkPerview}
              likePerview = {likePerview}
              unlikePerview = {unlikePerview}
              history = {history}
            />
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
