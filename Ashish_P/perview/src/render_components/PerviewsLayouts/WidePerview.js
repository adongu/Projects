import React from 'react';
import { withRouter } from 'react-router-dom';

const WidePerview = ({ perviews }) => {
  const renderPerviews = () => {
    return perviews.map((perview, i) => {
      return (
        <div key={`results__${i}`} className="results__product-Item">
          <div className="results__product">
            <div className=""><img src={perview.left.img}/></div>
            <div className="">
              <div className="">{perview.left.title}</div>
              <div className="">{perview.left.price}</div>
              <div className="">{perview.left.perviews} perviews</div>
            </div>
          </div>
          <div className="results__review">
            <div className="results__review-user">
              <div className=""><img src={perview.right.icon}/></div>
              <div className="">{perview.right.name}</div>
              <div className="">{perview.right.time}</div>
            </div>
            <div className="results__review-stars">{perview.right.rating}</div>
            <div className="results__review-tags">{perview.right.tags}</div>
            <div className="results__review-text">{perview.right.perview}</div>
            <div className="results__review-social-box">
              <div className="results__review-social-comments">
                <i className="fa fa-comments" aria-hidden="true"></i>
                {perview.right.comments} comments
              </div>
              <div className="results__review-social">
                <div className="results__review-social--save">
                  <i className="fa fa-bookmark" aria-hidden="true"></i>
                </div>
                <div className="results__review-social--share">
                  <i className="fa fa-share" aria-hidden="true"></i>
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    });
  }

  return (
    <div className="">
      { renderPerviews() }
    </div>
  )
}

export default withRouter(WidePerview);
