import axios from 'axios';
// const auth_url = "/amazon/item?keywords=imperial%20pomade";
//

function getCsrfToken() {
    var name = 'XSRF-TOKEN=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var config = {
  headers: {
  'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  },

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
};

export const logIn = () => {
  let token = getCsrfToken();

  return axios.post('/connect/facebook', {body: {
    scope: 'user_friends',
    { config }
  })

  // return fetch('/connect/facebook', {
  //   method: 'POST',
  //   headers: {
  //     'X-Requested-With': 'XMLHttpRequest',
  //     'X-XSRF-Token': token,
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     // 'Accept': 'application/json',
  //     // 'Origin': '*'
  //   },
  //   body: {
  //     scope: "user_friends"
  //   },
  //   credentials: 'same-origin',
  // })
}

export const fetchUser = () => {
  return axios('/api/user', config)
}

export const fetchToken = () => {
  return axios('/')
}

export const logOut = () => {
  return axios.post('/logout')
}
