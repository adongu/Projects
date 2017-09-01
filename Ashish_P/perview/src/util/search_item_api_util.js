import axios from 'axios';

export const fetchItemResults = (keywords) => {
  console.log("keywords", keywords);
  return axios('/amazon/item', {
    params: {
      keywords: keywords
    }
  })
}
