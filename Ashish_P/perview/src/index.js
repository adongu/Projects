import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

if(module.hot) {
  module.hot.accept('./containers/App.js', () => {
    const NextApp = require('./containers/App.js').default
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    )
  })
}
registerServiceWorker();
