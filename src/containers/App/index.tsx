import React from "react";
import { AppContainer } from "react-hot-loader";
import { ConnectedRouter } from "react-router-redux";
import { Switch } from "react-router-dom";
import { Route } from "react-router";
import { ApolloProvider } from "react-apollo";

import QuestionnairesPage from "containers/QuestionnairesPage";
import QuestionnaireCreatePage from "containers/QuestionnaireCreatePage";
import QuestionnaireMetaPage from "containers/QuestionnaireMetaPage";
import QuestionnaireDesignPage from "containers/QuestionnaireDesignPage";
import NotFoundPage from "containers/NotFoundPage";

const App = ({ store, client, history }) =>
  <AppContainer>
    <ApolloProvider client={client} store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={QuestionnairesPage} exact />
          <Route
            path="/questionnaire/create"
            component={QuestionnaireCreatePage}
          />
          <Route
            path="/questionnaire/:questionnaireId/meta"
            component={QuestionnaireMetaPage}
          />
          <Route
            path="/questionnaire/:questionnaireId/design/:sectionId/:pageId"
            exact={false}
            component={QuestionnaireDesignPage}
          />
          <Route path="*" component={NotFoundPage} exact />
        </Switch>
      </ConnectedRouter>
    </ApolloProvider>
  </AppContainer>;

export default App;
