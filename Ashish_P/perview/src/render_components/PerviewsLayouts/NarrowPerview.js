import "../../styles/stylesheets/narrowperview.css"
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import PerviewCard from './PerviewCard/PerviewCard.js';

const NarrowPerview = ({ perviews, bookmarkPerview, likePerview, history  }) => {

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
              <div className="flexrow narrowperviews__reviewnav">
                <div className="narrowperviews__stars">{renderStars(perview.rating)}</div>

                <div className="flexrow narrowperviews__editbox">
                  <button className="narrowperviews__edit-btn">
                    <i className="fa fa-pencil narrowperviews__edit-icon" aria-hidden="true"></i>
                  </button>
                  <button className="narrowperviews__delete-btn">
                    <i className="fa fa-trash narrowperviews__delete-icon" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <div className="narrowperviews__review-text">{perview.tags}</div>
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
