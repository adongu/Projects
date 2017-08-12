import axios from 'axios';

export const fetchResults = (keywords) => {
  console.log("keywords", keywords);
  return axios('/amazon/item', {
    params: {
      keywords: keywords
    }
  })
}
