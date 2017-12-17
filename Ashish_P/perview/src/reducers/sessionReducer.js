import { merge } from 'lodash';
import { REQUEST_USER, RECEIVE_CURRENT_USER, SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL, RECEIVE_PREVIOUS_PATH, RECEIVE_ERRORS } from '../actions/session_actions';

const _nullSession = Object.freeze({
  isFetching: false,
  currentUser: null,
  showLoginModal: false,
  previousPath: '',
  errors: []
})

const sessionReducer = (oldState = _nullSession, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, oldState, {
        isFetching: true
      });
    case RECEIVE_CURRENT_USER:
      let currentUser = action.currentUser;
      let newState = Object.assign({}, oldState, {
        isFetching: false,
        currentUser: currentUser,
        errors: []
      });
      return newState;
    case RECEIVE_ERRORS:
      let errors = action.errors;
      return Object.assign({}, oldState, {
        errors: errors
      });
    case SHOW_LOGIN_MODAL:
      return Object.assign({}, oldState, {
        showLoginModal: true
      });
    case HIDE_LOGIN_MODAL:
      console.log('hit HIDE_LOGIN_MODAL');
      return Object.assign({}, oldState, {
        showLoginModal: false
      });
    case RECEIVE_PREVIOUS_PATH:
      let previousPath = action.previousPath;

      if (!oldState.currentUser && !getCookie('perviewRedirectUrl')) {
        setCookie('perviewRedirectUrl', action.previousPath, 0.15)
        console.log('Storage is defined', getCookie('perviewRedirectUrl'));
        debugger
      }

      const perviewRedirectUrl = getCookie('perviewRedirectUrl');

      if (oldState.currentUser && perviewRedirectUrl) {
        console.log('hits oldState.currentUser && perviewRedirectUrl', getCookie('perviewRedirectUrl'));
          previousPath = perviewRedirectUrl;
          document.cookie = "perviewRedirectUrl=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      };
      console.log('previousPath', previousPath);

      // if (!redirectProtectedPath && !oldState.currentUser) {
      //   previousPath = action.previousPath;
      //   redirectProtectedPath = action.previousPath;
      // }
      // console.log('redirectProtectedPath =', redirectProtectedPath);
      // if (oldState.currentUser) {
      //   if (redirectProtectedPath) {
      //     previousPath = redirectProtectedPath;
      //     // redirectProtectedPath = null;
      //     console.log('hits redirectProtectedPath !== ``, previousPath =', previousPath);
      //   } else {
      //     previousPath = action.previousPath;
      //     console.log('hits else, previousPath =', previousPath);
      //   }
      // }

      return {
        ...oldState,
        previousPath: previousPath,
      }
    default:
      return merge(oldState, { errors: []});
  }
};

// 9 minutes max
const setCookie = (cname, cvalue, exdays = (0.15/24)) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cName) => {
    var name = cName;
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default sessionReducer;
