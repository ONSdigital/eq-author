import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import createReducer from "reducers";
import toastReducer from "reducers/toastReducer";

const configureStore = (history, client, preloadedState) => {
  return createStore(
    createReducer({
      apollo: client.reducer(),
      toasts: toastReducer
    }),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        createRouterMiddleware(history),
        thunk.withExtraArgument(client),
        client.middleware()
      )
    )
  );
};

export default configureStore;
