import axios from 'axios';

export const fetchResults = (keywords) => {
  console.log("keywords", keywords);
  return axios('/perview/item', {
    params: {
      keywords: keywords
    }
  })
}
