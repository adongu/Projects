import axios from 'axios';

var config = {
  // headers: {
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json'
    // 'Content-Type': 'multipart/form-data'
    // 'Content-Type': undefined
  // }
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'

}

// export const createPerview = (formData) => {
//   return axios.post('/api/add', formData, config)
// };

export const createPerview = ({formData, isSolicit = false, solicitPerviewId = null}) => {
  return axios({
    method: 'POST',
    url: '/api/add',
    data: formData,
    params: {
      isSolicit: isSolicit,
      solicitPerviewId: solicitPerviewId,
    },
    config
  })
};

export const editPerview = (formData) => {
  return axios.post('/api/edit', formData, config)
}

export const deletePerview = (perviewId) => {
  return axios.post(`/api/${perviewId}/delete`, config)
}


export const createItem = (item) => {
  return axios({
    method: 'POST',
    url: '/api/item/add',
    data: item,
    config
  })
};

export const fetchLandingPerviews = () => {
  return axios('/home');
}

export const fetchAllPerviews = (categoryId) => {
  return axios.get('/api', {
    params: {
      categoryId: categoryId
    }
  })
}

export const fetchItemPerviews = (itemId, categoryId) => {
  return axios.get(`/api/item/${itemId}`, {
    params: {
      categoryId: categoryId
    }
  })
}

export const fetchMyPerviews = (categoryId) => {
  return axios.get('/api/self', {
    params: {
      categoryId: categoryId
    }
  })
}

export const fetchFavoritePerviews = (categoryId) => {
  return axios.get('/api/bookmarks', {
    params: {
      categoryId: categoryId
    }
  })
}

export const fetchFriendPerviews = (friendUserId, categoryId) => {
  return axios.get(`/api/friend/${friendUserId}`, {
    params: {
      categoryId: categoryId
    }
  })
}

export const fetchSolicitPerviews = (solicitPerviewId) => {
  return axios(`/api/solicitPerviewId/${solicitPerviewId}`);
  //   , {
  //   params: {
  //     solicitPerviewId
  //   }
  // })
}

export const fetchNumPerviews = () => {
  return axios('api/user/num-perviews')
}

export const fetchCategoryIds = () => {
  return axios('/api/item/category')
}

export const createComment = (perviewId, comment) => {
  console.log(`util perviewId: ${perviewId} comment: ${comment}`);
  return axios({
    method: 'POST',
    url: `/api/${perviewId}/comment`,
    params: {
      comment: comment
    },
    config
  })
};

export const deleteComment = (perviewId, commentId) => {
  return axios({
    method: 'POST',
    url: `/api/${perviewId}/comment/${commentId}/delete`,
    config
  })
};
