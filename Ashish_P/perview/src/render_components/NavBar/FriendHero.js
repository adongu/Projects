import "../../styles/stylesheets/FriendPerviews/friendhero.css";
import React from 'react';

const FriendHero = ({user}) => {

  return (
    <div className="friendhero">
      <div className="friendhero__photo">
        <img
          className="friendhero__img" src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")}
          alt="User"
        />
      </div>

      <div className="friendhero__info">
        <span className="friendhero__name">
          {user.fullName}
        </span>
        <span className="friendhero__perviews">
          {user.numPerviews} Posts
        </span>
        <span className="friendhero__friends">
          {user.numFriends} Friends
        </span>
        <span className="friendhero__firsts">
          {user.numFirsts} Firsts
        </span>
      </div>

    </div>
  )
}

export default FriendHero;
