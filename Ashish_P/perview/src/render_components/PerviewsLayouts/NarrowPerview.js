import "../../styles/stylesheets/narrowperview.css"
import product from "../../styles/assets/product.jpg"
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import moment from 'moment';

const NarrowPerview = ({ perviews }) => {

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
        var item = perview.itemDto;
        var user = perview.userDto;

        return (
          <div key={`perviewindex__${i}`} className="flexcolumn narrowperviews__box">
            <div className="flexcolumn narrowperviews__productbox">
              <div className="narrowperviews__time">{moment(perview.ts).calendar()}</div>
              <div className="narrowperviews__img"><img className="narrowperviews__productimg-photo" src={item.data.imageUrls.large.url} alt="product"/></div>
              <div className="narrowperviews__name">{item.data.title}</div>
              <div className="narrowperviews__price">{item.data.lowestNewPrice.formattedAmount}</div>
              <div className="flexrow narrowperviews__buybox">
                <ButtonToolbar>
                  <Button className="narrowperviews__buy-btn" href={item.data.detailPageUrl}>BUY AT AMAZON</Button>
                </ButtonToolbar>
                <div className="narrowperviews__numperviews">{perview.likes ? perview.likes : 0} perviews</div>
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
              <div className="narrowperviews__review-tags">{perview.tags}</div>
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
