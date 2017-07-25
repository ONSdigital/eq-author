import render from "utils/render";
import registerServiceWorker from "utils/registerServiceWorker";
import createHistory from "history/createHashHistory";
import configureStore from "store/configureStore";
import createClient from "apollo/createClient";
import App from "containers/App";

let networkInterface;
if (process.env.REACT_APP_API_URL) {
  networkInterface = require("./apollo/createRealNetworkInterface").default;
} else {
  const mockNetworkInterface = require("./apollo/createMockNetworkInterface")
    .default;
  const mockResolvers = require("./tests/utils/MockResolvers").default;
  networkInterface = mockNetworkInterface(mockResolvers);
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

registerServiceWorker();

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
