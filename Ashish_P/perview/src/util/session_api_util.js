import axios from 'axios';

// const auth_url = "/amazon/item?keywords=imperial%20pomade";
//
// export const login = () => {
//   return axios.get(`${auth_url}`);


const auth_url = `/connect/facebok`;
export const login = (data) => {
  console.log("hit session util", data);
  return axios.post(`${auth_url}`, { data })
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
