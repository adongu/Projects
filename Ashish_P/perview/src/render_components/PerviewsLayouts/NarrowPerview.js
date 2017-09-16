import "../../styles/stylesheets/narrowperview.css"
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import PerviewCard from './PerviewCard/PerviewCard.js';

const NarrowPerview = ({ currentUserId, perviews, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, history }) => {

  const renderStars = (ratings) => {
    let stars = [1, 2, 3, 4, 5];
    return stars.map((ele)=>{
      return (
        <span key={ele} className={ele <= ratings ? 'active_star' : 'no_star'} >
          <i className="fa fa-star" aria-hidden="true"></i>
        </span>
      )
    })
  }

  const renderPerviews = () => {
    if (perviews) {

      return perviews.map((perview, i) => {
        let item = perview.itemDto;
        var user = perview.userDto;

        return (
          <div key={`perviewindex__${i}`} className="flexcolumn narrowperviews__box">
            <div className="flexcolumn narrowperviews__productbox">
              <div className="narrowperviews__time">
                {moment(perview.ts).format("MMM D")}
              </div>
              <div className="narrowperviews__img">
                <Link to={`/item/${item.id}`}>
                  <img className="narrowperviews__productimg-photo" src={item.data.imageUrls.large.url} alt="product"/>
                </Link>
              </div>

              <Link to={`/item/${item.id}`} className="narrowperviews__product-name">
                {item.data.title}
              </Link>

              <div className="narrowperviews__price">{item.data.lowestNewPrice.formattedAmount}</div>

              <div className="flexrow narrowperviews__buybox">
                <a className="buy-btn" href={item.data.detailPageUrl} target="_blank">Buy on Amazon</a>
                <div className="narrowperviews__numperviews">
                  {perview.likes ? perview.likes : 0} perviews
                </div>
              </div>
            </div>

            <div className="flexcolumn narrowperviews__reviewbox">
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
    }
  }

  return (
    <div className="narrowperviews__container">
      { renderPerviews() }
    </div>
  )
}

export default withRouter(NarrowPerview);
