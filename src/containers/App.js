import React from "react";
import { Route } from "react-router";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Switch } from "react-router-dom";
import routes from "routes";

const RouteWithSubRoutes = route => (
  <Route
    exact
    path={route.path}
    render={props => <route.component {...props} routes={route.routes}/>} // eslint-disable-line
  />
);

export default ({ store, history }) => (
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Switch>
      </ConnectedRouter>
    </Provider>
  </AppContainer>
);
