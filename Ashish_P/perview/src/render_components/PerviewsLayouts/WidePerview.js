import "../../styles/stylesheets/WidePerviews.css"
import product from "../../styles/assets/product.jpg"
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';

const WidePerview = ({ perviews }) => {

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
        <div key={`perviewindex__${i}`} className="flexrow wideresults__box">
          <div className="flexrow wideresults__perview-left">
            <div className="wideresults__productimg"><img className="wideresults__productimg-photo" src={product}/>
            </div>
            <div className="flexcolumn wideresults__perview-left-info">
              <div className="wideresults__product-title">{perview.left.title}</div>
              <div className="flexrow wideresults__product-info">
                <div className="wideresults__product-price">${perview.left.price}</div>
                <div className="wideresults__product-numperviews">{perview.left.perviews} perviews</div>
              </div>
              <ButtonToolbar>
                 <Button className="wideresults__product-buybtn" href="http://google.com">BUY AT AMAZON</Button>
               </ButtonToolbar>
            </div>
          </div>
          <div className="wideresults__perview-right">
            <div className="flexcolumn wideresults__perview-rightbox">
              <div className="wideresults__review-time">{perview.right.time}</div>
              <div className="flexrow wideresults__review-user">
                <div className="wideresults__review-user-icon"><img className="wideresults__review-user-img" src={perview.right.icon}/></div>
                <div className="wideresults__review-username">{perview.right.name}</div>
              </div>
              <div className="wideresults__review-stars">
                {renderStars(perview.right.rating)}
              </div>
              <div className="wideresults__review-tags">{perview.right.tags}</div>
              <div className="wideresults__review-text">{perview.right.perview}</div>
              <div className="flexrow wideresults__review-social-box">
                <div className="flexrow wideresults__review-comments-box">
                  <i className="fa fa-comments wideresults__review-comments-icon" aria-hidden="true"></i>
                  <div className="wideresults__review-comments"> {perview.right.comments} comments</div>
                </div>
                <div className="flexrow wideresults__review-social">
                  <div className="wideresults__review-social-save">
                    <i className="fa fa-bookmark wideresults__review-icon-save" aria-hidden="true"></i>
                    <div className="wideresults__review-save">Save</div>
                  </div>
                  <div className="wideresults__review-social-like">
                    <i className="fa fa-heart wideresults__review-icon-like" aria-hidden="true"></i>
                    <div className="wideresults__review-like">Like</div>
                  </div>
                  <div className="wideresults__review-social-share">
                    <i className="fa fa-share wideresults__review-icon-share" aria-hidden="true"></i>
                    <div className="wideresults__review-share">Share</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });
  }

  return (
    <div className="wideresults__container">
      { renderPerviews() }
    </div>
  )
}

export default withRouter(WidePerview);
