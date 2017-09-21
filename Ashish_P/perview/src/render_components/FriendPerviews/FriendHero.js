import "../../styles/stylesheets/FriendPerviews/friendhero.css";
import React from 'react';

const FriendHero = ({user}) => {
  return (
    <div className="friendhero">
      <div className="friendhero__photo">

      </div>

      <div className="friendhero__info">
        <span className="friendhero__name"></span>
        <span className="friendhero__membersince">Member since </span>
        <span className="friendhero__perviews"></span>
        <span className="friendhero__friends"></span>
        <span className="friendhero__firsts"></span>
        <span className="friendhero__earnings"></span>
      </div>

    </div>
  )
}

export default FriendHero;
