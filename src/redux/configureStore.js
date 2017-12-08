import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  routerMiddleware as createRouterMiddleware,
  routerReducer as router
} from "react-router-redux";
import uiState from "redux/uiState/reducer";
import toasts from "redux/toast/reducer";

const configureStore = (history, client, preloadedState) =>
  createStore(
    combineReducers({
      router,
      uiState,
      toasts,
      apollo: client.reducer()
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

export default configureStore;
