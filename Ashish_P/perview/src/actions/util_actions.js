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
  } else {
    // fallback user image
    return 'https://s3.amazonaws.com/yumpapp-dev/perview/user.png';
  };

  return;
};
