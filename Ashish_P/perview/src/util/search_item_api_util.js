import axios from 'axios';

export const fetchItemResults = (keywords) => {
  return axios('/api/walmart/item', {
    params: {
      keywords: keywords
    }
  })
}
