import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './reducers';

export default function configureStore({
  history,
  initialState,
  extraReducers,
}) {
  let middlewares = [thunkMiddleware, routerMiddleware(history)];
  const appliedMiddleware = applyMiddleware(...middlewares);

  const injectedReducers = extraReducers || {};
  const rootReducer = createRootReducer(injectedReducers, initialState);

  let store;

  if (!process.env.SERVER) {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(
      connectRouter(history)(rootReducer),
      initialState,
      composeEnhancers(appliedMiddleware)
    );
  } else {
    store = createStore(connectRouter(history)(rootReducer), appliedMiddleware);
  }

  store.injectReducer = function injectReducer(reducerName, reducer) {
    if (typeof reducerName !== 'string' || typeof reducer !== 'function') {
      throw new Error(
        'Both a valid reducerName and a reducer must be supplied to the injectReducer-function'
      );
    }
    if (!injectedReducers[reducerName]) {
      injectedReducers[reducerName] = reducer;
      const rootReducer = createRootReducer(injectedReducers, initialState);
      store.replaceReducer(connectRouter(history)(rootReducer));
    }
  };

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const createNextRootReducer = require('./reducers').default;
      const nextRootReducer = createNextRootReducer(
        injectedReducers,
        initialState
      );
      store.replaceReducer(connectRouter(history)(nextRootReducer));
    });
  }

  return {
    store,
  };
}
