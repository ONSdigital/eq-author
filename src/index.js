import render from "utils/render";
import createHistory from "history/createHashHistory";
import configureStore from "store/configureStore";
import createClient from "apollo/createClient";
import App from "containers/App";
import Raven from "raven-js";

let networkInterface;

if (process.env.REACT_APP_USE_SENTRY === "true") {
  Raven.config(
    "https://b72ac0e6b36344fca4698290bf9a191d@sentry.io/233989"
  ).install();
}

if (process.env.REACT_APP_USE_MOCK_API === "true") {
  const mockNetworkInterface = require("./apollo/createMockNetworkInterface")
    .default;
  const mockResolvers = require("./tests/utils/MockResolvers").default;
  networkInterface = mockNetworkInterface(mockResolvers);
} else {
  networkInterface = require("./apollo/createRealNetworkInterface").default;
}

const client = createClient(networkInterface);

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

  module.hot.accept("reducers", () => {
    const nextReducer = require("reducers").default;
    store.replaceReducer(nextReducer);
  });
}
