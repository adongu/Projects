import axios from 'axios';

export const fetchResults = (keywords) => {
  return axios('/api/search', {
    params: {
      keywords: keywords
    }
  })
}
