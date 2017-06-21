import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import questionnaire from "reducers/questionnaire/";

const createReducer = reducers =>
  combineReducers({
    questionnaire,
    router,
    ...reducers
  });

export default createReducer;
