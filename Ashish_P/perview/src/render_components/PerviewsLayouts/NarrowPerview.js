import "../../styles/stylesheets/narrowperview.css"
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
            <div className="narrowperviews__img"><img className="narrowperviews__productimg-photo" src={perview.top.img}/></div>
            <div className="narrowperviews__name">{perview.top.title}</div>
            <div className="narrowperviews__price">${perview.top.price}</div>
            <div className="flexrow narrowperviews__buybox">
              <ButtonToolbar>
                 <Button className="narrowperviews__buy-btn" href="http://google.com">BUY AT AMAZON</Button>
              </ButtonToolbar>
              <div className="narrowperviews__numperviews">{perview.top.perviews} perviews</div>
            </div>
          </div>

          <div className="flexcolumn narrowperviews__review-box">
            <div className="flexrow narrowperviews__review-nav">
              <div className="narrowperviews__review-stars">{renderStars(perview.bottom.rating)}</div>
              <div className="flexrow narrowperviews__editbox">
                <div className="narrowperviews__review-edit">
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                  <div className="narrowperviews__review-save">Save</div>
                </div>
                <div className="narrowperviews__review-delete">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                  <div className="narrowperviews__review-share">Share</div>
                </div>
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
