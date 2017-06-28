import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";

const createReducer = reducers =>
  combineReducers({
    router,
    ...reducers
  });

export default createReducer;
