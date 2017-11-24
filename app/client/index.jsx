import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'normalize.css';

import App from './components/App/';

import './style';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('mount'),
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App/', () =>
    // FIXME: Re-require workaround for components not hot-reloading properly
    render(require('./components/App/').default)); // eslint-disable-line global-require
}
