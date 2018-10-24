import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import persistState from "redux-localstorage";
import {
  routerMiddleware as createRouterMiddleware,
  routerReducer as router
} from "react-router-redux";
import toasts from "redux/toast/reducer";
import saving from "redux/saving/reducer";
import tabs from "redux/tabs/reducer";
import authReducer from "redux/auth/reducer";
import fieldValidation from "redux/fieldValidation/reducer";
import properties from "redux/properties/reducer";
import page from "redux/page/reducer";

let auth;

if (process.env.REACT_APP_ENABLE_AUTH === "true") {
  auth = require("auth").default;
} else {
  auth = require("auth/fakeAuth").default;
}

const configureStore = (history, client, preloadedState) =>
  createStore(
    combineReducers({
      router,
      saving,
      tabs,
      toasts,
      auth: authReducer,
      fieldValidation,
      page,
      properties
    }),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        createRouterMiddleware(history),
        thunk.withExtraArgument({ auth, client })
      ),
      persistState(["page", "properties", "fieldValidation"])
    )
  );

export default configureStore;
