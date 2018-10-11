import React from 'react';
import ReactDOMServer from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import configureStore from '../client/redux/configureStore';
import AppFrame from '../client/components/AppFrame/AppFrame';
import { getHtml } from './views/htmlHelpers';
import { preloadRouteData, preloadDataErrorHandler } from './renderUtils';

export default ({ clientStats }) => (req, res) => {
  const history = createHistory();
  const { store } = configureStore({ history });

  const reactRouterContext = {};
  const ServerApp = () => (
    <Provider store={store} key="provider">
      <StaticRouter location={req.url} context={reactRouterContext}>
        <AppFrame />
      </StaticRouter>
    </Provider>
  );

  preloadRouteData(req.url, store)
    .then(() => {
      console.log('loaded data');
      const reactDomString = ReactDOMServer.renderToString(<ServerApp />);

      switch (reactRouterContext.status) {
        case 302:
          res.status(reactRouterContext.status);
          res.location(reactRouterContext.url);
          res.end();
          break;
        default: {
          const chunkNames = flushChunkNames();
          const { styles, js, cssHash } = flushChunks(clientStats, {
            chunkNames,
          });
          let stateJson = JSON.stringify(store.getState());
          res
            .status(reactRouterContext.status || 200)
            .send(getHtml({ stateJson, js, cssHash, styles, reactDomString }));
        }
      }
    })
    .catch((err) => {
      preloadDataErrorHandler(err, res, req);
    });
};
