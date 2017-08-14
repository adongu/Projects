import axios from 'axios';

var config = {
  headers: {
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json'
    'Content-Type': 'multipart/form-data'
    // 'Content-Type': undefined
  }
}

export const createPerview = (formData) => {
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

export const createItem = (item) => {
  return axios.post('/api/item/add', item)
};


export const fetchAllPerviews = (categoryId) => {
  return axios('/api', categoryId)
}

export const fetchItemPerviews = (itemId) => {
  return axios(`/api/item/${itemId}`)
}

export const fetchMyPerviews = (categoryId) => {
  return axios('/api/self', categoryId)
}

export const fetchFavoritePerviews = (categoryId) => {
  return axios('/api/bookmarks', categoryId)
}

export const fetchFriendPerviews = (friendUserId, categoryId) => {
  return axios(`/api/friend/${friendUserId}`, categoryId)
}

export const fetchCategoryIds = () => {
  return axios('/api/item/category')
}

export const editPerview = (keywords) => {

}

export const deletePerview = (keywords) => {

}
