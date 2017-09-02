import React from 'react';
import { Link } from 'react-router-dom';

const itemPerviews = ({ item, perviews, bookmarkPerview, likePerview, history }) => {
  const renderItem = () => {

  }

  const renderPerviews = () => {
    if (perviews) {
      {perviews.forEach((perview) => {
        return (
          <div key=`item-${item.id}_Perview-${perview.id}`>
            <div className="itemperview__userbox">
              <span className="itemperview__imgbox">
                <img />
              </span>
              <span className="itemperview__username"></span>
            </div>
            <div className="itemperview__ratingbox"></div>
            <div className="itemperview__reviewbox"></div>
            <div className="itemperview__socialbox"></div>
          </div>
        )
      })}
    }
  }

  return (
    <div className="flexrow">
      {renderPerviews()}
    </div>
  )
}
