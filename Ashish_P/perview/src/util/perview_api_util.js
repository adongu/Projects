import axios from 'axios';

export const createPerview = (formData) => {
  console.log(formData);
  return axios.post('/perview/add', formData)
};

export const editPerview = (keywords) => {

}

export const deletePerview = (keywords) => {

}

export const likePerview = (keywords) => {

}
export const unlikePerview = (keywords) => {

}

export const bookmarkPerview = (keywords) => {

}

export const unbookmarkPerview = (keywords) => {

}
