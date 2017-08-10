import axios from 'axios';

var config = {
  headers: {
    'Accept': 'application/json',
    // 'Content-Type': 'application/json'
    'Content-Type': 'multipart/form-data'
    // 'Content-Type': undefined
  }
}

export const createPerview = (formData) => {
  for (var key of formData.entries()) {
    console.log(key[0] + ', ' + key[1]);
  }
  return axios.post('/api/add', formData, config)
  // return axios({
  //     method: 'post',
  //     url: '/api/add',
  //     config,
  //     data: formData
  //     // data: {itemId: 1, tags: "hello", rating: 3}
  // })
  .then(response => {
    console.log('response', response);
    return response
  })
  .catch(error => {
    return error
    console.log('error', error);
  });
};


export const fetchAllPerviews = (keywords) => {
  return axios('/api')
}

export const fetchMyPerviews = (keywords) => {
  return axios('/api/self')
}

export const fetchFavoritePerview = (keywords) => {
  return axios('/api/bookmarks')
}

export const fetchFriendPerview = (friendUserId) => {
  return axios(`/api/friend/${friendUserId}`)
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
