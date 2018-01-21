import axios from 'axios';

export const fetchItemResults = (keywords) => {
  return axios("/api/walmart/item", {
    params: {
      keywords: keywords
    }
  })
}

export const fetchMetaData = (url) => {
  const baseUrl = "https://opengraph.io/api/1.1/site/";
  const app_id = "5a5d22c2ae29eae46520440c";

  return axios(`${baseUrl}${url}?${app_id}`);
}
