import "../../styles/stylesheets/narrowperview.css"
import product from "../../styles/assets/product.jpg"
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';

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
    return perviews.map((perview, i) => {
      return (
        <div key={`perviewindex__${i}`} className="flexcolumn narrowperviews__box">
          <div className="flexcolumn narrowperviews__productbox">
            <div className="narrowperviews__time">{perview.top.time}</div>
            <div className="narrowperviews__img"><img className="narrowperviews__productimg-photo" src={product}/></div>
            <div className="narrowperviews__name">{perview.top.title}</div>
            <div className="narrowperviews__price">${perview.top.price}</div>
            <div className="flexrow narrowperviews__buybox">
              <ButtonToolbar>
                 <Button className="narrowperviews__buy-btn" href="http://google.com">BUY AT AMAZON</Button>
              </ButtonToolbar>
              <div className="narrowperviews__numperviews">{i} perviews</div>
            </div>
          </div>

          <div className="flexcolumn narrowperviews__reviewbox">
            <div className="flexrow narrowperviews__reviewnav">
              <div className="narrowperviews__stars">{renderStars(perview.bottom.rating)}</div>
              <div className="flexrow narrowperviews__editbox">
                <button className="narrowperviews__edit-btn">
                  <i className="fa fa-pencil narrowperviews__edit-icon" aria-hidden="true"></i>
                </button>
                <button className="narrowperviews__delete-btn">
                  <i className="fa fa-trash narrowperviews__delete-icon" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="narrowperviews__review-tags">{perview.bottom.tags}</div>
            <div className="narrowperviews__review-text">{perview.bottom.perview}</div>
          </div>
        </div>
      )
    });
  }

  return (
    <div className="narrowperviews__container">
      { renderPerviews() }
    </div>
  )
}

export default withRouter(NarrowPerview);
