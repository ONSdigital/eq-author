import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import createReducer from "reducers";

const configureStore = (history, client, preloadedState) => {
  return createStore(
    createReducer({ apollo: client.reducer() }),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        createRouterMiddleware(history),
        thunk,
        client.middleware()
      )
    )
  );
};

export default configureStore;
