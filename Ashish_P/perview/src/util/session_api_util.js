import axios from 'axios';

function getCsrfToken() {
    var name = 'XSRF-TOKEN=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//
var config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  },

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
};

export const logIn = () => {
  let token = getCsrfToken();

  return axios({
    method: 'POST',
    url: '/connect/facebook',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': token
    },
    data: {
      scope: 'user_friends',
    },
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN'
  })
  .then((response) => {
    if (response.status === 200) {
      axios.post('login/finish/facebook', config)
      .then(() => {

      })
      .catch(() => {

      })
    }
  })
}

export const fetchUser = () => {
  return axios('/api/user')
}

export const fetchToken = () => {
  return axios('/')
}

export const logOut = () => {
  return axios.post('/logout', config)
}
