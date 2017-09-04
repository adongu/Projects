import axios from 'axios';

var config = {
  // headers: {
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json'
    // 'Content-Type': 'multipart/form-data'
    // 'Content-Type': undefined
  // }
  // xsrfCookieName: 'XSRF-TOKEN',
  // xsrfHeaderName: 'X-XSRF-TOKEN'

}

export const createPerview = (formData) => {
  return axios.post('/api/add', formData, config)

  return axios({
    method: 'POST',
    url: '/api/add',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    config
  })
  .then(response => {
    return response
  })
  .catch(error => {
    return error
  });
};

export const createItem = (item) => {
  return axios({
    method: 'POST',
    url: '/api/item/add',
    data: item,
    config
  })
};

export const fetchAllPerviews = () => {
  return axios('/api')
}

export const fetchItemPerviews = (itemId) => {
  return axios(`/api/item/${itemId}`)
}

export const fetchMyPerviews = (categoryId) => {
  return axios.get('/api/self', {
    params: {
      categoryId: categoryId
    }
  })
}

export const fetchFavoritePerviews = (categoryId) => {
  return axios('/api/bookmarks', categoryId)
}

export const fetchFriendPerviews = (friendUserId, categoryId) => {
  return axios(`/api/friend/${friendUserId}`, categoryId)
}

export const fetchNumPerviews = () => {
  return axios('api/user/num-perviews')
}

export const fetchCategoryIds = () => {
  return axios('/api/item/category')
}


export const editPerview = (keywords) => {

}

export const deletePerview = (keywords) => {

}
