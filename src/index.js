import render from "utils/render";
import createHistory from "history/createHashHistory";
import configureStore from "redux/configureStore";
import App from "containers/App";
import Raven from "raven-js";
import getIdForObject from "utils/getIdForObject";
import fragmentMatcher from "apollo/fragmentMatcher";
import createApolloClient from "apollo/createApolloClient";
import createApolloCache from "apollo/createApolloCache";
import createHttpLink from "apollo/createHttpLink";
import createErrorLink from "apollo/createApolloErrorLink";
import { ApolloLink } from "apollo-link";

if (process.env.REACT_APP_USE_SENTRY === "true") {
  Raven.config(
    "https://b72ac0e6b36344fca4698290bf9a191d@sentry.io/233989"
  ).install();
}

let store;

const getStore = () => store;

const cache = createApolloCache({
  addTypename: true,
  dataIdFromObject: getIdForObject,
  fragmentMatcher,
  cacheRedirects: {
    Query: {
      questionnaire: (_, args, { getCacheKey }) => {
        return getCacheKey({
          __typename: "Questionnaire",
          id: args.id
        });
      }
    }
  }
});

const history = createHistory({
  basename: process.env.REACT_APP_BASE_NAME
});

const link = ApolloLink.from([
  createErrorLink(getStore),
  createHttpLink(process.env.REACT_APP_API_URL)
]);

const client = createApolloClient(link, cache);

store = configureStore(history, client);

const renderApp = render(document.getElementById("root"), {
  store,
  client,
  history
});

renderApp(App);

if (module.hot) {
  module.hot.accept("containers/App", () => {
    const NextApp = require("containers/App").default;
    renderApp(NextApp);
  });
}
