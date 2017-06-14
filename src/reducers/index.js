import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import questionnaire from "reducers/questionnaire/";

const createReducer = reducers =>
  combineReducers({
    questionnaire,
    router: routerReducer,
    ...reducers
  });

export default createReducer;
