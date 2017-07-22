import { merge } from 'lodash';

const _nullUser = Object.freeze({
  currentUser: null,
  errors: []
})


const sessionReducer = (oldState = _nullUser, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case: SIGNIN

    default:
      return merge(oldState, { errors: []})
  }
};

export default sessionReducer;
