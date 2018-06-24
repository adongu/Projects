import axios from 'axios';

export const fetchItemResults = (keywords) => {
  return axios('/api/amazon/item', {
    params: {
      keywords: keywords
    }
  })
}
