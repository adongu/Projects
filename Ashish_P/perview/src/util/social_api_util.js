import axios from 'axios';

export const likePerview = (perviewId) => {
  return axios.post(`api/${perviewId}/add`)
}

export const bookmarkPerview = (perviewId) => {
  return axios.post(`api/${perviewId}/add`)
}

// export const unlikePerview = (perviewId) => {
//   return axios.post(`api/${perviewId}/add`)
// }
//
// export const unbookmarkPerview = (perviewId) => {
//   return axios.post(`api/${perviewId}/add`)
// }
