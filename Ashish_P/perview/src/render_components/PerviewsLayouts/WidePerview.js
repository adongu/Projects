import "../../styles/stylesheets/WidePerviews.css"
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';

const WidePerview = ({ perviews }) => {

  const renderPerviews = () => {
    return perviews.map((perview, i) => {
      return (
        <div key={`perviewindex__${i}`} className="row wideresults__box">
          <div className="row wideresults__perview-left">
            <div className="wideresults__productimg"><img className="wideresults__productimg-photo" src={perview.left.img}/>
            </div>
            <div className="column wideresults__perview-left-info">
              <div className="wideresults__product-title">{perview.left.title}</div>
              <div className="row wideresults__product-info">
                <div className="wideresults__product-price">$ {perview.left.price}</div>
                <div className="wideresults__product-numperviews">{perview.left.perviews} perviews</div>
              </div>
              <ButtonToolbar>
                 <Button className="wideresults__product-buybtn" href="http://google.com">BUY AT AMAZON</Button>
               </ButtonToolbar>
            </div>
          </div>
          <div className="column wideresults__perview-right">
            <div className="wideresults__review-time">{perview.right.time}</div>
            <div className="row wideresults__review-user">
              <div className=""><img src={perview.right.icon}/></div>
              <div className="">{perview.right.name}</div>
            </div>
            <div className="wideresults__review-stars">{perview.right.rating}</div>
            <div className="wideresults__review-tags">{perview.right.tags}</div>
            <div className="wideresults__review-text">{perview.right.perview}</div>
            <div className="row wideresults__review-social-box">
              <div className="wideresults__review-social-comments">
                <i className="fa fa-comments" aria-hidden="true"></i>
                {perview.right.comments} comments
              </div>
              <div className="row wideresults__review-social">
                <div className="wideresults__review-social--save">
                  <i className="fa fa-bookmark" aria-hidden="true"></i>
                  <div className="wideresults__review-save">Save</div>
                </div>
                <div className="wideresults__review-social--share">
                  <i className="fa fa-share" aria-hidden="true"></i>
                  <div className="wideresults__review-share">Share</div>
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
