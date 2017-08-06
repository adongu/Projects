//stylesheets
import './styles/stylesheets/reset.css';
// react-bootstrap stytlesheets
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-select/dist/react-select.css';
import './styles/stylesheets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import registerServiceWorker from './registerServiceWorker';
import ConfigureStore from './store/Store';


document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  let store;
  store = ConfigureStore();
  ReactDOM.render(<Root store={ store }/>, root);
});

if(module.hot) {
  module.hot.accept('./containers/Root', () => {
    const root = document.getElementById('root');
    let store;
    store = ConfigureStore();
    const NextRoot = require('./containers/Root').default
    ReactDOM.render(
      <NextRoot store={ store }/>, root);
  })
}
registerServiceWorker();
