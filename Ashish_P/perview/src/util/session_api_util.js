import axios from 'axios';
// const auth_url = "/amazon/item?keywords=imperial%20pomade";
//
// var config = {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
//     }
// };

export const fetchUser = () => {
  return axios('/api/user')
}

export const logOut = () => {
  return axios.get('/logout')
}
