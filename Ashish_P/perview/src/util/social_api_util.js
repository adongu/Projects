import axios from 'axios';

export const likePerview = (perviewId) => {
  return axios.post(`api/${perviewId}/like`)
}

export const bookmarkPerview = (perviewId) => {
  return axios.post(`api/${perviewId}/bookmark`)
}

// export const unlikePerview = (perviewId) => {
//   return axios.post(`api/${perviewId}/add`)
// }
//
// export const unbookmarkPerview = (perviewId) => {
//   return axios.post(`api/${perviewId}/add`)
// }
