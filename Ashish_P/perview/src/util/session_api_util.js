import axios from 'axios';

// const auth_url = ""
const auth_url = "/connect/facebook"


export const login = (user) => {
  return axios({
    method: 'post',
    url: `${auth_url}`,
    data: {
      // type: "hidden",
      // name: "scope",
      value: "user_friends"
    }
  })
}
//
// export const logout = () => {
//   return $.ajax({
//     method:"DELETE",
//     url: "/connect/session",
//   });
// };
