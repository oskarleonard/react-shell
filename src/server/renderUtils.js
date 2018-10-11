import path from 'path';
import { matchRoutes } from 'react-router-config';
import routes from '../client/routes/routes';

// The components that we're declaring in routes.js are imported async, so we can't garantee that
// they're loaded when we want to call fetchData on the server and thus we need to import them
// staticly/synchronously. This we do with an old-school require.
const staticRoutes = routes.map((route) => {
  const staticComponent = require('../client/' + route.componentPath).default;
  if (route.routes) {
    let staticChildren = route.routes.map((childRoute) => {
      const staticComponent = require('../client/' + childRoute.componentPath)
        .default;

      return {
        staticComponent,
        ...childRoute,
      };
    });

    return {
      staticComponent,
      ...route,
      routes: staticChildren,
    };
  } else {
    return {
      staticComponent,
      ...route,
    };
  }
});

export function preloadRouteData(url, store) {
  const routePromises = matchRoutes(staticRoutes, url);

  const promises = routePromises.reduce((accumPromises, { route }) => {
    const wrappedContainer = route.staticComponent.WrappedComponent;

    console.log('accumPromises: ', accumPromises);
    console.log('wrappedContainer: ', wrappedContainer);
    if (wrappedContainer.fetchData) {
      accumPromises.push(wrappedContainer.fetchData(store));
      return accumPromises;
    }
    console.log('-----accumPromises: ', accumPromises);
    return accumPromises;
  }, []);

  console.log('routePromises: ', routePromises);
  console.log('promises: ', promises.length);

  return Promise.all(promises);
}

export function preloadDataErrorHandler(err, res, req) {
  if (err.code === 'ECONNABORTED') {
    res.status(503).sendFile(path.join(`${__dirname}/static/500-sv.html`));
    console.error(
      `${new Date().toUTCString()}\t==> Request timeout= ${err}\turl=${req.url}`
    );
  }
}
