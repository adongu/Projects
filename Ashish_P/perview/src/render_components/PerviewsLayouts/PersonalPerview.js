import "../../styles/stylesheets/WidePerviews.css"
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';

const WidePerview = ({ perviews }) => {

  const renderPerviews = () => {
    return perviews.map((perview, i) => {
      return (
        <div key={`perviewindex__${i}`} className="flexrow narrowperviews__box">
          <div className="flexrow narrowperviews__perview-left">
            <div className="narrowperviews__productimg"><img className="narrowperviews__productimg-photo" src={perview.left.img}/>
            </div>
            <div className="flexcolumn narrowperviews__perview-left-info">
              <div className="narrowperviews__product-title">{perview.left.title}</div>
              <div className="flexrow narrowperviews__product-info">
                <div className="narrowperviews__product-price">${perview.left.price}</div>
                <div className="narrowperviews__product-numperviews">{perview.left.perviews} perviews</div>
              </div>
              <ButtonToolbar>
                 <Button className="narrowperviews__product-buybtn" href="http://google.com">BUY AT AMAZON</Button>
               </ButtonToolbar>
            </div>
          </div>
          <div className="flexcolumn narrowperviews__perview-right">
            <div className="narrowperviews__review-time">{perview.right.time}</div>
            <div className="flexrow narrowperviews__review-user">
              <div className=""><img src={perview.right.icon}/></div>
              <div className="">{perview.right.name}</div>
            </div>
            <div className="narrowperviews__review-stars">{perview.right.rating}</div>
            <div className="narrowperviews__review-tags">{perview.right.tags}</div>
            <div className="narrowperviews__review-text">{perview.right.perview}</div>
            <div className="flexrow narrowperviews__review-social-box">
              <div className="narrowperviews__review-social-comments">
                <i className="fa fa-comments" aria-hidden="true"></i>
                {perview.right.comments} comments
              </div>
              <div className="flexrow narrowperviews__review-social">
                <div className="narrowperviews__review-social--save">
                  <i className="fa fa-bookmark" aria-hidden="true"></i>
                  <div className="narrowperviews__review-save">Save</div>
                </div>
                <div className="narrowperviews__review-social--share">
                  <i className="fa fa-share" aria-hidden="true"></i>
                  <div className="narrowperviews__review-share">Share</div>
                </div>
              </div>
            </div>

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

export default withRouter(WidePerview);
