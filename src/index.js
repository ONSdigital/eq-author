import render from "utils/render";
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

const renderApp = render(document.getElementById("root"), { store, history });

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
