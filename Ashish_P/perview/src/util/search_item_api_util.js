import axios from 'axios';

export const fetchItemResults = (keywords) => {
  return axios('/amazon/item', {
    params: {
      keywords: keywords
    }
  })
}
