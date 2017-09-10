import axios from 'axios';
// const auth_url = "/amazon/item?keywords=imperial%20pomade";
//

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
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
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
      // 'Access-Control-Allow-Origin': 'http://localhost:3000',
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': token
      // 'Origin': '*'
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

  // return fetch('http://localhost:8080/connect/facebook', {
  //   method: 'POST',
  //   headers: {
  //     'X-Requested-With': 'XMLHttpRequest',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //     'X-XSRF-Token': token,
  //     'X-CSRF-Token': token,
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Accept': 'application/json',
  //     'Origin': '*'
  //   },
  //   body: {
  //     scope: "user_friends"
  //   }
  // })
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
