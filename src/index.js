import React from "react";
import { render } from "react-dom";
import createHistory from "history/createHashHistory";
import { configureStore, configurePersistedStore } from "store/configureStore";
import App from "containers/App";

let useStorage = true;

const history = createHistory({
  basename: process.env.BASE_NAME
});

const store = useStorage
  ? configurePersistedStore(history, "eq-authoring-prototype-storage-key")
  : configureStore(history);

render(
  <App store={store} history={history} />,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("containers/App", () => {
    const NextApp = require("containers/App").default;
    render(NextApp);
  });

  module.hot.accept("reducers", () => {
    const nextReducer = require("reducers").default;
    store.replaceReducer(nextReducer);
  });
}
