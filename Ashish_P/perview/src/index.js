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

// if(module.hot) {
//   module.hot.accept('./containers/App', () => {
//     const NextApp = require('./containers/App').default
//     ReactDOM.render(
//       <NextApp />,
//       document.getElementById('root')
//     )
//   })
// }
registerServiceWorker();
