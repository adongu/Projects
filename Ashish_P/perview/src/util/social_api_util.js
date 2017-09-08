import axios from 'axios';

var config = {
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
};

export const likePerview = (perviewId) => {
  return axios({
    method: 'POST',
    url: `api/${perviewId}/like`,
    config
  })
}

export const bookmarkPerview = (perviewId) => {
  return axios({
    method: 'POST',
    url: `api/${perviewId}/bookmark`,
    config
  })
}

export const unlikePerview = (perviewId) => {
  return axios.post(`api/${perviewId}/unlike`)
}

export const unbookmarkPerview = (perviewId) => {
  return axios.post(`api/${perviewId}/unbookmark`)
}
