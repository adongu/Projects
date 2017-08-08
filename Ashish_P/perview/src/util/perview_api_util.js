import axios from 'axios';

export const createReview = (keywords) => {
  console.log("keywords", keywords);
  return axios('/perview/search', {
    params: {
      keywords: keywords
    }
  })
}

export const editReview = (keywords) => {
  console.log("keywords", keywords);
  return axios('/perview/search', {
    params: {
      keywords: keywords
    }
  })
}

export const deleteReview = (keywords) => {
  console.log("keywords", keywords);
  return axios('/perview/search', {
    params: {
      keywords: keywords
    }
  })
}

export const unlikeReview = (keywords) => {
  console.log("keywords", keywords);
  return axios('/perview/search', {
    params: {
      keywords: keywords
    }
  })
}
export const unlikeReview = (keywords) => {
  console.log("keywords", keywords);
  return axios('/perview/search', {
    params: {
      keywords: keywords
    }
  })
}

export const saveReview = (keywords) => {
  console.log("keywords", keywords);
  return axios('/perview/search', {
    params: {
      keywords: keywords
    }
  })
}

export const unsaveReview = (keywords) => {
  console.log("keywords", keywords);
  return axios('/perview/search', {
    params: {
      keywords: keywords
    }
  })
}
