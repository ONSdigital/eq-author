import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import { createMiddleware, reducer, createLoader } from "redux-storage";
import createEngine from "redux-storage-engine-localstorage";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import createHistory from "history/createHashHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "react-router-redux";

import rootReducer from "reducers"; // Or wherever you keep your reducers

import App from "containers/App";

// Create a history of your choosing (we're using a browser history in this case)
let basename = ''
if (process.env.NODE_ENV === 'production') {
  basename = '/eq-author-prototypes'
}

const history = createHistory({
  basename: basename
})

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const storageReducer = reducer(rootReducer);
const storageEngine = createEngine("eq-authoring-prototype-storage-key");
const storageMiddleware = createMiddleware(storageEngine);
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  storageReducer,
  composeWithDevTools(applyMiddleware(middleware, storageMiddleware))
);

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

const render = RootComponent => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <RootComponent history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

const load = createLoader(storageEngine);

load(store).then(newState => {
  render(App);
});

if (module.hot) {
  module.hot.accept("containers/App", () => {
    const NextApp = require("containers/App").default;
    render(NextApp);
  });

  module.hot.accept("reducers", () => {
    const nextReducer = require("reducers/index").default;
    console.log(nextReducer);
    store.replaceReducer(nextReducer);
  });
}
