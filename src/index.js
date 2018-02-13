import render from "utils/render";
import createHistory from "history/createHashHistory";
import configureStore from "redux/configureStore";
import App from "containers/App";
import Raven from "raven-js";
import getIdForObject from "utils/getIdForObject";
import fragmentMatcher from "apollo/fragmentMatcher";
import createApolloClient from "apollo/createApolloClient";
import createApolloCache from "apollo/createApolloCache";

if (process.env.REACT_APP_USE_SENTRY === "true") {
  Raven.config(
    "https://b72ac0e6b36344fca4698290bf9a191d@sentry.io/233989"
  ).install();
}

let link;

if (process.env.REACT_APP_USE_MOCK_API === "true") {
  const createSchemaLink = require("./apollo/createSchemaLink").default;
  link = createSchemaLink();
} else {
  const createHttpLink = require("./apollo/createHttpLink").default;
  link = createHttpLink(process.env.REACT_APP_API_URL);
}

const cache = createApolloCache({
  addTypename: true,
  dataIdFromObject: getIdForObject,
  fragmentMatcher
});

const client = createApolloClient(link, cache);

const history = createHistory({
  basename: process.env.REACT_APP_BASE_NAME
});

const store = configureStore(history, client);

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
