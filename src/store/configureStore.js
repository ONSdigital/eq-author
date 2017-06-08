import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import rootReducer from "reducers";

const configureStore = (history, preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(createRouterMiddleware(history), thunk))
  );
};

export default configureStore;
