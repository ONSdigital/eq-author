import React from "react";
import PropTypes from "prop-types";
import { AppContainer } from "react-hot-loader";
import { ConnectedRouter } from "react-router-redux";
import { Switch } from "react-router-dom";
import { Route } from "react-router";
import { ApolloProvider } from "react-apollo";
import routes from "routes";
import client from "apollo/client";

const renderRoute = route => props =>
  <route.component {...props} routes={route.routes} />;

const App = ({ store, history }) =>
  <AppContainer>
    <ApolloProvider client={client} store={store}>
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
    </ApolloProvider>
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
