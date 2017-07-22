import axios from 'axios';

const auth_url = "/connect/facebook"

export const fetchUser = (user) => {
  return axios.post(`${auth_url}`, {
    data: { user }
  }
}
