import render from "utils/render";
import registerServiceWorker from "utils/registerServiceWorker";
import createHistory from "history/createHashHistory";
import configureStore from "store/configureStore";
import App from "containers/App";
import client from "apollo/client";

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
