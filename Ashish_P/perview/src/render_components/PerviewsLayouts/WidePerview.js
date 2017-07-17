import React from 'react';
import { withRouter } from 'react-router-dom';

const WidePerview = ({ perviews }) => {
  const renderPerviews = () => {
    perviews.map((perview, i) => {
      return (
        <div key={`results__${i}`} className="results__product-Item">
          <div className="results__product">
            <div>{perview.left.title}</div>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="results__review">
            <div className="results__review-user">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="results__review-stars"></div>
            <div className="results__review-tags"></div>
            <div className="results__review-text"></div>
            <div className="results__review-social-box">
              <div className="results__review-social-comments">
                <i className="fa fa-comments" aria-hidden="true"></i>
              </div>
              <div className="results__review-social">
                <div className="results__review-social--save"></div>
                <div className="results__review-social--share"></div>
              </div>
            </div>

          </div>
        </div>
      )
    });
  }

  return (
    <div>
      { renderPerviews() }
    </div>
  )
}

export default withRouter(WidePerview);
