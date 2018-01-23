import axios from 'axios';

export const sendDigestEmail = (keywords) => {
  return axios('api/admin/email/send-digest', {})
}
