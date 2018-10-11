import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Immutable from 'immutable';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from '@client/shared/utils/history';
import configureStore from './redux/configureStore';
import AppFrame from './components/AppFrame/AppFrame';
import 'shared/styles/base.scss';

let initialState = {};
if (window.__SERVER_STATE__) {
  try {
    let plain = window.__SERVER_STATE__;
    for (const key in plain) {
      initialState[key] = Immutable.fromJS(plain[key]);
    }
  } catch (e) {
    // TODO: not good, report error somewhere
  }
}

const { store } = configureStore({
  initialState,
  history,
});

const renderApp = (AppFrame) => {
  hydrate(
    <AppContainer>
      <Provider store={store} key="provider">
        <ConnectedRouter history={history}>
          <AppFrame />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(AppFrame);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/AppFrame/AppFrame.js', () => {
    const App = require('./components/AppFrame/AppFrame').default; // eslint-ignore-line
    renderApp(App);
  });
}
