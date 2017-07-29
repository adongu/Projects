import axios from 'axios';

// const auth_url = "/amazon/item?keywords=imperial%20pomade";
//
// export const login = () => {
//   return axios.get(`${auth_url}`);


const auth_url = `http://localhost:8080/connect/facebook`;
// const redirect_uri = `http://localhost:8080/`;
const redirect_uri = `https://www.facebook.com/connect/login_success.html`;

export const login = () => {
  console.log("hit session util");
  return axios.post(`${auth_url}`, {"scope": "user_friends" })
  .then((oauth_url) => {
    console.log(oauth_url);
    return axios.get(`${oauth_url}`)
  })
  .catch( (error) => {
    console.log(error);
  })
}
    // data: {
    //   type: "hidden",
    //   name: "scope",
    //   value: "user_friends"
    // }

//
// export const logout = () => {
//   return $.ajax({
//     method:"DELETE",
//     url: "/connect/session",
//   });
// };
