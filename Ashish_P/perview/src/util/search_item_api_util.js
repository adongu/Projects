import axios from 'axios';

export const fetchResults = (keywords) => {
  console.log("keywords", keywords);
  return axios('/api/item', {
    params: {
      itemName: keywords
    }
  })
}
