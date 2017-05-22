import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import rootReducer from "reducers";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";

export const configureStore = (history, preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(createRouterMiddleware(history), thunk)
    )
  );
};

export const configurePersistedStore = (history, key, timeout = 1000) => {
  const store = configureStore(history, loadState(key));

  store.subscribe(throttle(() => {
    saveState(key, store.getState());
  }, timeout));

  return store;
};
