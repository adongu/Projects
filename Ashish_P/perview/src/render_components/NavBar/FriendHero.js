import "../../styles/stylesheets/NavBar/friendhero.css";
import React from 'react';
import * as util from '../../actions/util_actions.js';

const FriendHero = ({ user, tags, handleFriendClick }) => {
  return (
    <div className="friendhero flexcolumn">
      <p>See Friend's Suggestions for</p>

      <div className="friendhero__info flexcolumn">
        <div className="friendhero__user">
          <img
            onClick={handleFriendClick(user.id)}
            className="friendhero__img" src={util.generateUserImageUrl(user.facebookId, 'square')}
            alt="User"
          />

          <span
            onClick={handleFriendClick(user.id)}
            className="friendhero__name"
          >
            {user.fullName}
          </span>
        </div>

        <div className="friendhero__tags">
          {tags}
        </div>
      </div>

    </div>
  )
}

export default FriendHero;
