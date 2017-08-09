import axios from 'axios';

export const createPerview = (formData) => {
  for (var key of formData.entries()) {
          console.log(key[0] + ', ' + key[1]);
      }
  return axios.post('/perview/add', formData)
    .then(response => {
      return response
      console.log('response', response);
    })
    .catch(error => {
      return error
      console.log('error', error);
    });

};
// export const createPerview = (formData) => {
//   for (var key of formData.entries()) {
//           console.log(key[0] + ', ' + key[1]);
//       }
//   return axios.post('/perview/add', formData)
//     .then(response => {
//       return response
//       console.log('response', response);
//     })
//     .catch(error => {
//       return error
//       console.log('error', error);
//     });
//
// };

export const fetchAllPerviews = (keywords) => {
  return axios('/perview')
}

export const fetchMyPerviews = (keywords) => {
  return axios('/perview/self')
}

export const fetchFavoritePerview = (keywords) => {
  return axios('/perview/bookmarks')
}

export const fetchFriendPerview = (friendUserId) => {
  return axios(`/perview/friend/${friendUserId}`)
}

export const editPerview = (keywords) => {

}

export const deletePerview = (keywords) => {

}

export const likePerview = (keywords) => {

}
export const unlikePerview = (keywords) => {

}

export const bookmarkPerview = (keywords) => {

}

export const unbookmarkPerview = (keywords) => {

}
