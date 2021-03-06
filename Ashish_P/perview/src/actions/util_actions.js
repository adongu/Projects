import React from 'react';

import { showLoginModal } from '../actions/session_actions';

/**
  @param number @facebookUserId
  @param number @size

  @return ''
**/
export const generateUserImageUrl = (facebookUserId = null, size = null) => {
  const sizes = {
    'small': 'small',
    'normal': 'normal',
    'album': 'album',
    'large': 'large',
    'square': 'square'
  };

  if (facebookUserId && sizes[size]) {
    return `http://graph.facebook.com/${facebookUserId}/picture?type=${size}`;
  }
  // fallback user image
  return 'https://s3.amazonaws.com/yumpapp-dev/perview/user.png';
};

/**
  @param number @rating

  @return Component
**/
export const renderStars = (rating) => {
  let stars = [1, 2, 3, 4, 5];
  return stars.map((ele)=>{
    return (
      <span key={ele} className={ele <= rating ? 'active_star' : 'no_star'} >
        <i className="fa fa-star" aria-hidden="true"></i>
      </span>
    )
  })
}

export const handleShowLoginModalOrCallBack = (currentUserId, protectedCallBack) => {
  if (currentUserId) {
    this.protectedCallBack();
  } else {
    if (showLoginModal) {
      console.log('shows login modal');
      showLoginModal();
    }
  }
}
