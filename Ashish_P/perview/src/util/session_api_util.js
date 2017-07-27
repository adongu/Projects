import axios from 'axios';

// const auth_url = "/amazon/item?keywords=imperial%20pomade";
//
// export const login = () => {
//   return axios.get(`${auth_url}`);


const auth_url = `/auth/facebook`;
export const login = () => {
  return axios.get(`${auth_url}`)
  // .then((response) => {
  //   console.log(response);
  // })
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
