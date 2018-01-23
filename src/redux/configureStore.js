import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  routerMiddleware as createRouterMiddleware,
  routerReducer as router
} from "react-router-redux";
import persistState from "redux-localstorage";
import uiState from "redux/uiState/reducer";
import toasts from "redux/toast/reducer";

import authReducer from "redux/auth/reducer";

let auth;

/* istanbul ignore next */
if (process.env.REACT_APP_ENABLE_AUTH === "true") {
  auth = require("auth").default;
} else {
  auth = require("auth/fakeAuth").default;
}

import routing from "redux/routing/reducer";

const configureStore = (history, client, preloadedState) =>
  createStore(
    combineReducers({
      router,
      uiState,
      toasts,
      auth: authReducer,
      routing,
      apollo: client.reducer()
    }),
    preloadedState,
    composeWithDevTools(
      persistState("routing"),
      applyMiddleware(
        createRouterMiddleware(history),
        thunk.withExtraArgument({ client, auth }),
        client.middleware()
      )
    )
  );

export default configureStore;
