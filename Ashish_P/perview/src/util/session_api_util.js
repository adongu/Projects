import axios from 'axios';
// const auth_url = "/amazon/item?keywords=imperial%20pomade";
//
// export const login = () => {
//   return axios.get(`${auth_url}`);


const auth_url = `http://localhost:8080/connect/facebook`;
// const redirect_uri = `https://www.facebook.com/connect/login_success.html`;
var payload = {
  scope: "user_friends"
};
var data = new FormData();
data.append( "json", JSON.stringify( payload ) );

export const login = () => {
  console.log('hit login')
  // return fetch(`${auth_url}`, {
  //   method: 'POST',
  //   headers: {
  //     "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
  //   },
  //   body: data
  // })
  // .then((response) => {
  //   return Promise.resolve(response)
  // })
  // .catch((error) => {
  //   console.log(error);
  // })
// };


  return axios.get(`${auth_url}`)
  .Promose.resolve((response) => {
    console.log(response);
    return response.data;
    if (response.redirected) {
      // window.location = response.redirect;
    }
  })
  .catch( (error) => {
    console.log("hit error", error);
    return error;
  })
};
