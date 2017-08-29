import axios from 'axios';
// const auth_url = "/amazon/item?keywords=imperial%20pomade";
//
var config = {
  headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN'
  }

};

axios.defaults.headers

export const logIn = () => {
  axios.post('/connect/facebook', config)
}

export const fetchUser = () => {
  return axios('/api/user', config)
}

export const fetchToken = () => {
  return axios('/')
}

export const logOut = () => {
  return axios.post('/logout', config)
}
