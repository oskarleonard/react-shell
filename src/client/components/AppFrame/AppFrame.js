import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import routes from '../../routes/routes';
import { routeWithSubRoutes } from '../../shared/routerUtils/routerUtils';
import Header from './header/Header';

class AppFrame extends Component {
  render() {
    return (
      <div id="app-container">
        <Header />
        <main id="content-below-header">
          <Switch>
            {routes.map((route, index) => routeWithSubRoutes(route, index))}
          </Switch>
        </main>
      </div>
    );
  }
}

export default AppFrame;
