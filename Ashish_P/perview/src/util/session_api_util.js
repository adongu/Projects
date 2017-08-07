import axios from 'axios';
// const auth_url = "/amazon/item?keywords=imperial%20pomade";
//
// export const login = () => {
//   return axios.get(`${auth_url}`);


// const auth_url = `/connect/facebook`;
// var payload = {
//   scope: "user_friends"
// };
// var data = new FormData();
// data.append( "json", JSON.stringify( payload ) );
//
// export const login = () => {
//   console.log('hit login')
//   return axios({
//     url: `${auth_url}`,
//     method: 'POST',
//     headers: {
//       "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
//     },
//     data: data
//   })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//     return Promise.reject(error);
//   })
// };

export const fetchUser = () => {
  return axios('/perview/user')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}
