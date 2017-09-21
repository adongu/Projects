import "../../styles/stylesheets/FriendPerviews/friendhero.css";
import React from 'react';

const FriendHero = ({user, numPerviews}) => {
  console.log('friendhero', user);
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
        <span className="friendhero__membersince">
          Member since
        </span>
        <span className="friendhero__perviews">
          {numPerviews}
        </span>
        <span className="friendhero__friends">
          {user.numFriends}
        </span>
        <span className="friendhero__firsts">
          First to Perview: {user.firsts}
        </span>
        <span className="friendhero__earnings">
          Points {user.points}
        </span>
      </div>

    </div>
  )
}

export default FriendHero;
