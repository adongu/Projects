import axios from 'axios';

// export const fetchPerviewResults = (keywords) => {
//   return axios('/api/search', {
//     params: {
//       keywords: keywords
//     }
//   })
// }

export const fetchPerviewResults = (keywords) => {
  return axios('/api/full-search', {
    params: {
      keywords: keywords
    }
  })
}
