import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import questionnaire from "reducers/questionnaire/";

const rootReducer = combineReducers({
  questionnaire,
  router: routerReducer
});

export default rootReducer;
