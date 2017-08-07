import axios from 'axios';
// const auth_url = "/amazon/item?keywords=imperial%20pomade";
//

export const fetchUser = () => {
  return axios('/perview/user')
}

export const logOut = () => {
  return axios('/logout')
}
