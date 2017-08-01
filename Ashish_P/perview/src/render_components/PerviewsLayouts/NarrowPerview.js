import "../../styles/stylesheets/narrowperview.css"
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';

const NarrowPerview = ({ perviews }) => {

  const renderPerviews = () => {
    return perviews.map((perview, i) => {
      return (
        <div key={`perviewindex__${i}`} className="flexcolumn narrowperviews__box">
          <div className="flexcolumn narrowperviews__productbox">
            <div className="narrowperviews__time">{perview.left.time}</div>
            <div className="narrowperviews__img"><img className="narrowperviews__productimg-photo" src={perview.left.img}/></div>
            <div className="narrowperviews__name">{perview.left.title}</div>
            <div className="narrowperviews__price">${perview.left.price}</div>
            <div className="flexrow">
              <ButtonToolbar>
                 <Button className="narrowperviews__product-buybtn" href="http://google.com">BUY AT AMAZON</Button>
              </ButtonToolbar>
              <div className="narrowperviews__product-numperviews">{perview.left.perviews} perviews</div>
            </div>
          </div>

          <div className="flexcolumn narrowperviews__review-box">
            <div className="flexrow narrowperviews__review-nav">
              <div className="narrowperviews__review-stars">{perview.right.rating}</div>
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
            <div className="narrowperviews__review-tags">{perview.right.tags}</div>
            <div className="narrowperviews__review-text">{perview.right.perview}</div>
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
