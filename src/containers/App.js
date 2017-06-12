import React from "react";
import PropTypes from "prop-types";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Switch } from "react-router-dom";
import { Route } from "react-router";
import routes from "routes";

const renderRoute = route => props =>
  <route.layout title={route.title}>
    <route.component {...props} routes={route.routes} />
  </route.layout>;

const App = ({ store, history }) =>
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map((route, i) =>
            <Route
              exact={route.exact}
              key={route}
              path={route.path}
              render={renderRoute(route)}
            />
          )}
        </Switch>
      </ConnectedRouter>
    </Provider>
  </AppContainer>;

App.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default App;
