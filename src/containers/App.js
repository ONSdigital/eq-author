import React from "react";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Switch } from "react-router-dom";
import { Route } from "react-router";

import SurveyPage from "containers/Survey";
import CreateSurvey from "containers/CreateSurvey";
import DesignSurvey from "containers/DesignSurvey";
import NotFound from "pages/NotFound";

const componentForRoute = Component => props => <Component {...props} />;

export default ({ store, history }) => (
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            path="/"
            render={componentForRoute(SurveyPage)}
            exact
          />
          <Route
            path="/create"
            render={componentForRoute(CreateSurvey)}
          />
          <Route
            path="/design/:sectionsId?/:questionsId?/:answersId?"
            render={componentForRoute(DesignSurvey)}
          />
          <Route
            path="*"
            render={componentForRoute(NotFound)}
            exact
          />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </AppContainer>
);
